#!/bin/bash
# run.sh - Script for executing JavaScript code inside a Docker container

WORKDIR="/tmp/js-execution"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "$CODE" > solution.js

if [ ! -z "$INPUT" ]; then
  echo "$INPUT" > input.txt
fi

TIMEOUT_SECONDS=5

if [ ! -z "$INPUT" ]; then
  # For JavaScript, we need to handle input differently than with Python
  # Creating a modified script that reads from input.txt
  cat > run_with_input.js << EOF
const fs = require('fs');
// Redirect input to be available via process.stdin
const inputData = fs.readFileSync('input.txt', 'utf8');
const originalStdin = process.stdin;
const mockStdin = require('stream').Readable.from(inputData);
process.stdin = mockStdin;

// Include the solution code
require('./solution.js');
EOF
  timeout "$TIMEOUT_SECONDS" node run_with_input.js
else
  timeout "$TIMEOUT_SECONDS" node solution.js
fi

EXECUTION_STATUS=$?
if [ $EXECUTION_STATUS -eq 124 ]; then
  echo "Execution timed out after $TIMEOUT_SECONDS seconds" >&2
  exit 1
fi

rm -rf "$WORKDIR"
exit $EXECUTION_STATUS