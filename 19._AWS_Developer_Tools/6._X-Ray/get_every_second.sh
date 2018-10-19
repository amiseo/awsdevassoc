#!/bin/sh
count=1

while [ 1 ]; do
  echo Exec: $count
  curl http://127.0.0.1:8080
  echo
  count=`expr $count + 1`
  sleep 1
done
