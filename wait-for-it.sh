#!/usr/bin/env bash

# wait-for-it.sh

set -e

HOST="$1"
PORT="$2"
TIMEOUT="${3:-30}"

shift 3

cmd="$@"

echo "Waiting for $HOST:$PORT to be available..."

for i in $(seq 1 $TIMEOUT); do
  nc -z $HOST $PORT && break
  echo "Waiting... ($i/$TIMEOUT)"
  sleep 1
done

if [ "$i" -eq "$TIMEOUT" ]; then
  echo "Timeout: $HOST:$PORT did not become available"
  exit 1
fi

echo "$HOST:$PORT is available, executing command..."
exec $cmd
