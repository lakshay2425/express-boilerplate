#!/bin/sh
env | grep -v "no_proxy" > /app/.env.production
exec "$@"