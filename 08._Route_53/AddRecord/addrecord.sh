#!/bin/sh
#
# Add an A record to an existing hosted zone in Route53.
# Change ZONEID below to point to the zone ID of the zone you're modifying.
# You must modify the key "Name" vlue in record.json as well.
#

ZONEID="Z1VQVU90MCS7AK"

aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://record.json
