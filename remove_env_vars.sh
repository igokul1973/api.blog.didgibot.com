#!/bin/bash

# For some reason the env vars from the .env
# file are sometimes leaked into the os environment,
# which interferes with Docker usage and manipulation
# of the variables in the .env file.

# This script unsets all environment variables in the
# shell that exist as first words before '=' sign
# on each line of the .env file.
# Used strictly for development purposes.

# Run this file by sourcing it:
# source ./remove_env_vars.sh

FILE=".env"

while read -r line; do
  var=$(echo "$line" | cut -d '=' -f 1)
  unset "$var"
  printf "%s\n" "$var"
done < "$FILE"
