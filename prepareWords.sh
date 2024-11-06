#!/bin/bash

# Check if the input file path is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <input_file>"
    exit 1
fi

# Input file path
input_file="$1"

# Create output file path
base=$(basename "$input_file")
dir=$(dirname "$input_file")
output_file="${dir}/${base%.*} (modified).${base##*.}"

# Process the data
sed 's/([^)]*)//g' "$input_file" | sed 's/;[^@]*//g' | sed 's/-[^@]*//g' | sed 's/ *, */, /g' | sed 's/\.\.\.//g' | sed 's/[[:space:],]*$//' | sed 's/ \{2,\}/ /g' > "$output_file"

echo "Success! Check the output in $output_file."