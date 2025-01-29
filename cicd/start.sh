#!/bin/bash

# Build the project
yarn build &&

# Start node app
yarn node:dist &

# Start nginx
nginx -g 'daemon off;'
