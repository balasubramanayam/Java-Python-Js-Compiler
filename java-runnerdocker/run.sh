#!/bin/bash
# run.sh - Script for executing Java code inside a Docker container

WORKDIR="/tmp/java-execution"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo "$CODE" > Solution.java

if [ ! -z "$INPUT" ]; then
  echo "$INPUT" > input.txt
fi

TIMEOUT_SECONDS=5
javac Solution.java
COMPILE_STATUS=$?

if [ $COMPILE_STATUS -eq 0 ]; then
  if [ ! -z "$INPUT" ]; then
    timeout "$TIMEOUT_SECONDS" java Solution < input.txt
  else
    timeout "$TIMEOUT_SECONDS" java Solution
  fi

  EXECUTION_STATUS=$?
  if [ $EXECUTION_STATUS -eq 124 ]; then
    echo "Execution timed out after $TIMEOUT_SECONDS seconds" >&2
    exit 1
  fi
else
  echo "Compilation failed" >&2
  exit 1
fi

rm -rf "$WORKDIR"
exit 0
