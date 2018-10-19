# AWS Developer Associate - X-Ray

## Install Deps
```
npm install
```

## Configure
Edit app.js and set sqsQueueURL.

## Run
```
node app.js
```

## Output
```
[ec2-user@ip-172-31-23-164 6._X-Ray]$ node app.js 
> NOTE: this application requires an EC2 role that permits X-Ray, SNS and SQS
App listening on port 8080
[winston] Attempt to write logs with no transports {"message":"Encountered unexpected exception when fetching sampling rules: Error: Failed to get the current sub/segment from the context.","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"No effective centralized sampling rule match. Fallback to local rules.","level":"info"}
[winston] Attempt to write logs with no transports {"message":"Local sampling rule match found for { http_method: GET, host: 18.222.229.190:8080, url_path: / }. Matched default. Using fixed_target: 1 and rate: 0.05.","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Starting express segment: { url: /, name: ADGUApp, trace_id: 1-5bca5e8c-18c67153265e2c3e1ddef1df, id: 0513a4db0ba0e4cb, sampled: true }","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Closed express segment successfully: { url: /, name: ADGUApp, trace_id: 1-5bca5e8c-18c67153265e2c3e1ddef1df, id: 0513a4db0ba0e4cb, sampled: true }","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Segment sent: {\"trace_id:\"1-5bca5e8c-18c67153265e2c3e1ddef1df\",\"id\":\"0513a4db0ba0e4cb\"}","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"UDP message sent: {\"trace_id\":\"1-5bca5e8c-18c67153265e2c3e1ddef1df\",\"id\":\"0513a4db0ba0e4cb\",\"start_time\":1539989131.83,\"name\":\"ADGUApp\",\"service\":{\"runtime\":\"node\",\"runtime_version\":\"v8.12.0\",\"version\":\"unknown\",\"name\":\"unknown\"},\"aws\":{\"xray\":{\"sdk\":\"X-Ray for Node.js\",\"sdk_version\":\"2.0.1\",\"package\":\"aws-xray-sdk\"}},\"http\":{\"request\":{\"method\":\"GET\",\"user_agent\":\"\",\"client_ip\":\"::ffff:18.222.229.190\",\"url\":\"http://18.222.229.190:8080/\"},\"response\":{\"status\":200}},\"end_time\":1539989131.846}","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"No effective centralized sampling rule match. Fallback to local rules.","level":"info"}
[winston] Attempt to write logs with no transports {"message":"Local sampling rule match found for { http_method: POST, host: 18.222.229.190:8080, url_path: / }. Matched default. Using fixed_target: 1 and rate: 0.05.","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Starting express segment: { url: /, name: ADGUApp, trace_id: 1-5bca5e8c-054883e9b0343346ace39d0b, id: ee2c2bdb6118569e, sampled: false }","level":"debug"}
> Received POST with data: {"ts":1539989131842,"count":154}
[winston] Attempt to write logs with no transports {"message":"Closed express segment successfully: { url: /, name: ADGUApp, trace_id: 1-5bca5e8c-054883e9b0343346ace39d0b, id: ee2c2bdb6118569e, sampled: false }","level":"debug"}
Pushed to SQS
[winston] Attempt to write logs with no transports {"message":"No effective centralized sampling rule match. Fallback to local rules.","level":"info"}
[winston] Attempt to write logs with no transports {"message":"Local sampling rule match found for { http_method: GET, host: 18.222.229.190:8080, url_path: / }. Matched default. Using fixed_target: 1 and rate: 0.05.","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Starting express segment: { url: /, name: ADGUApp, trace_id: 1-5bca5e8f-921f1b4f4b0c993d187d5ffb, id: b640776ca9b1fa74, sampled: true }","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Closed express segment successfully: { url: /, name: ADGUApp, trace_id: 1-5bca5e8f-921f1b4f4b0c993d187d5ffb, id: b640776ca9b1fa74, sampled: true }","level":"debug"}
[winston] Attempt to write logs with no transports {"message":"Segment sent: {\"trace_id:\"1-5bca5e8f-921f1b4f4b0c993d187d5ffb\",\"id\":\"b640776ca9b1fa74\"}","level":"debug"}
> Received POST with data: {"ts":1539989134830,"count":155}
Pushed to SQS
> Received POST with data: {"ts":1539989137834,"count":156}
Pushed to SQS
> Received POST with data: {"ts":1539989140838,"count":157}
Pushed to SQS
```
