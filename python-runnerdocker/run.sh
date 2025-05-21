#!/bin/bash
# run.sh - Script for executing Python code inside a Docker container

WORKDIR="/tmp/python-execution"
mkdir -p "$WORKDIR" 
cd "$WORKDIR" || exit 1

# Get the code from environment variable
echo "$CODE" > solution.py

# Handle input if provided
if [ ! -z "$INPUT" ]; then
  echo "$INPUT" > input.txt
fi

TIMEOUT_SECONDS=5

# Run the Python code
if [ ! -z "$INPUT" ]; then
  timeout "$TIMEOUT_SECONDS" python3 solution.py < input.txt
else
  timeout "$TIMEOUT_SECONDS" python3 solution.py
fi

# Check execution status
EXECUTION_STATUS=$?

if [ $EXECUTION_STATUS -eq 124 ]; then
  exit 1
fi

# Clean up
rm -rf "$WORKDIR"
exit $EXECUTION_STATUS