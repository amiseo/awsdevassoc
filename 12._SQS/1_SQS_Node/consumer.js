var AWS = require("aws-sdk");
var fs = require("fs");

AWS.config.loadFromPath('./config.json');

var settings = JSON.parse(fs.readFileSync("settings.json"));

/*
 * This app sends messageTotal to the queue
 * casting a vote for a random contestant
 */

var sqs = new AWS.SQS();
var sqlite3 = require('sqlite3').verbose();
var db;

/*
 * Create sqlite3 db
 */
console.log("> Creating DB, if needed");
db = new sqlite3.Database('votes.sqlite3');
db.run("CREATE TABLE IF NOT EXISTS votes (name TEXT, count INT);", createIndex);
function createIndex() {
  db.run("CREATE UNIQUE INDEX IF NOT EXISTS votes_index ON votes (name)");
}


/*
 * Find the queue url
 */
console.log("> Getting queue URL for queue: " + settings.queueName);

var params = {
  QueueName: settings.queueName
};
sqs.getQueueUrl(params, function(err, data) {
  if (err) {
    //console.log(err, err.stack);
    console.log("  " + err.message);
  } else {
    //console.log(JSON.stringify(data));
    console.log("  " + data.QueueUrl + "\n");
    if (data.QueueUrl) {
      setInterval( function() {pollMessages(data.QueueUrl); }, settings.consumerPollFreq );
    }
  }
});

function pollMessages(url) {
  console.log("> Polling for a new message");

  var params = { 
    QueueUrl: url
  };
  sqs.receiveMessage(params, function(err, data) {
    if (err) {
      //console.log(err, err.stack);
      console.log("  " + err.message);
    } else {
      //console.log(JSON.stringify(data));
      if (data.Messages) {
        for (var i = 0; i < data.Messages.length; i++) {
          var body = JSON.parse(data.Messages[i].Body);
          var handle = data.Messages[i].ReceiptHandle;

          console.log("  Received vote for " + body.voteFor + " (id:" + body.voteId + "), updating database.");
          //insert into DB
          var stmt = db.prepare("INSERT OR REPLACE INTO votes VALUES (?, COALESCE( (SELECT count FROM votes WHERE name=?), 0) + 1 )");
          stmt.run(body.voteFor, body.voteFor);
          deleteMessage(url, handle, body.voteId);
        }
      }
    }
  });
}

function deleteMessage(url, handle, voteId) {
  console.log("  Deleting message with id: " + voteId);
  var params = {
    QueueUrl: url,
    ReceiptHandle: handle
  };
  sqs.deleteMessage(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
  });
}

process.on('SIGINT', function() {
  console.log("\n\n> Caught interrupt signal, dumping vote tally.\n");
  db.all("SELECT * FROM votes", function(err, rows) {
    rows.forEach(function (row) {
      console.log(row.name + ":\t" + row.count);
    });
    closeDb();
  });
});

function closeDb() {
  console.log("\n> Closing database.");
  db.close();
  process.exit(0);
}
