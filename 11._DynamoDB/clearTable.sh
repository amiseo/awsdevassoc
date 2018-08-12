#!/bin/bash
# https://gist.github.com/pushplay/d2cac7ca1a10a5a49f6947a02657a23a

TABLE_NAME=CarsNE2
KEY=id


aws dynamodb scan --table-name $TABLE_NAME --attributes-to-get "$KEY" \
  --query "Items[].$KEY.N" --output text | \
  tr "\t" "\n" | \
  xargs -t -I keyvalue aws dynamodb delete-item --table-name $TABLE_NAME --key "{\"$KEY\": {\"N\": \"keyvalue\"}}"
