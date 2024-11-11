#!/bin/bash

# Check if the input file path, language from, language to, and level are provided
if [ "$#" -ne 4 ]; then
    echo "Usage: $0 <input_file> <level> <language_from> <language_to>"
    exit 1
fi

# Input file path
input_file="$1"
level="$2"
language_from="$3"
language_to="$4"

# Create output file path
base=$(basename "$input_file")
output_dir="../resources/words"
mkdir -p "$output_dir"
output_file="${output_dir}/${base}"

# Add metadata values to the output file in a single line
echo "$level;$language_from;$language_to" > "$output_file"

# Process the data and append to the output file, skipping the first 4 lines (metadata)
tail -n +1 "$input_file" | \
sed ':a; s/([^()]*)//g; t a' | \
sed 's/;[^@]*//g' | \
sed 's/-[^@]*//g' | \
sed 's/ *, */, /g' | \
sed 's/\.\.\.//g' | \
sed 's/[[:space:],]*$//' | \
sed 's/ \{2,\}/ /g' | \
sed '/\*\*\*/d' | \
tr '@' ';' >> "$output_file"

if [ $? -eq 0 ]; then
    echo "Success! Check the output in $output_file."
else
    echo "An error occurred during processing."
fi
