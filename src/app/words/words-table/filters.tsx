import React from "react";
import { WordsTableFilters } from "./wordsTable";
import { Input } from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

export const TableFilters: React.FC<{
  filters: WordsTableFilters;
  onChange: (newFilters: WordsTableFilters) => void;
}> = ({ filters, onChange }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, name: e.target.value });
  };

  const handleLevelChange = (value: string[]) => {
    onChange({ ...filters, levels: value });
  };

  return (
    <div className="flex gap-x-4">
      <div>
        <Input
          type="text"
          placeholder="Name"
          value={filters.name || ""}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <ToggleGroup
          type="multiple"
          value={filters.levels || []}
          onValueChange={handleLevelChange}
        >
          <ToggleGroupItem value="A1">A1</ToggleGroupItem>
          <ToggleGroupItem value="A2">A2</ToggleGroupItem>
          <ToggleGroupItem value="B1">B1</ToggleGroupItem>
          <ToggleGroupItem value="B2">B2</ToggleGroupItem>
          <ToggleGroupItem value="C1">C1</ToggleGroupItem>
          <ToggleGroupItem value="C2">C2</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};
