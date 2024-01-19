#!/bin/bash

set -e

host="$1"
shift
port="$1"
shift
cmd="$@"

until echo 'SELECT 1' | mysql -h"$host" -P"$port" -u"$MYSQL_DB_USER" -p"$MYSQL_ROOT_PASSWORD" -D "$MYSQL_DB_NAME"; do
  >&2 echo "MySQL is unavailable - sleeping"
  sleep 1
done

>&2 echo "MySQL is up - executing command"
exec $cmd
