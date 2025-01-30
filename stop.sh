#!/bin/bash

# This script is used to stop the docker compose,
# remove the mongo container and mongo image,
# and remove the mongo DB data directory so that we can
# reinitialize the DB on `docker compose up` command.

# Used strictly for development purposes.

set -e

# Check if docker-compose.yml file exists
if [ ! -f "docker-compose.yaml" ]; then
  echo "docker-compose.yaml file not found"
  exit 1
fi

# Stop docker compose
docker compose stop;

docker container rm dgb-blog-mongo || true;
docker image rm igk19/mongo8:1.0.0 || true;
rm -rf ./data/db/.* || true;
rm -rf  ./data/db/*;
