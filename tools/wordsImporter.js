/* eslint-disable */
// @ts-nocheck

import fs from "fs";
import { PrismaClient } from "@prisma/client";
import readline from "readline";
import { v4 } from "uuid";
import path from "path";

const prisma = new PrismaClient();

/**
 * @param {fs.PathLike} filePath
 */
async function importWords(filePath) {
  const fileStream = fs.createReadStream(filePath, "utf8");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let level, lang_from, lang_to;

  for await (const line of rl) {
    try {
      if (!level && !lang_from && !lang_to) {
        {
          [level, lang_from, lang_to] = line.split(";");
          continue;
        }
      }

      const [name, translation] = line.split(";");
      if (name && translation && level && lang_from && lang_to) {
        await prisma.word.upsert({
          where: {
            name_translation: {
              name: name.trim(),
              translation: translation.trim(),
            },
          },
          update: {
            level: level.trim(),
            lang_from: lang_from.trim(),
            lang_to: lang_to.trim(),
          },
          create: {
            level: level.trim(),
            lang_from: lang_from.trim(),
            lang_to: lang_to.trim(),
            name: name.trim(),
            translation: translation.trim(),
          },
        });
      }
    } catch (error) {
      console.error(`Error processing line: ${line}`, error);
    }
  }
}

async function importAllWordsFromDir(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.lstatSync(filePath).isFile()) {
      console.log(`Importing words from file: ${filePath}`);
      await importWords(filePath);
    }
  }

  await prisma.$disconnect();
}

// Replace 'resources/words' with the actual path to your directory
importAllWordsFromDir("../resources/words");
