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
  timeout "$TIMEOUT_SECONDS" node solution.js < input.txt
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