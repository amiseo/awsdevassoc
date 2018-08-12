var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

ec2.describeInstances(null, function(err, data) {
  if (err) {
    console.log(err, err.stack); 
  } else {
    console.log("Total Reservations: " + data.Reservations.length);
    if (totRes > 0) {
      data.Reservations.forEach(function (item) {
        item.Instances.forEach(function (instance) {
          var name;
          instance.Tags.forEach(function (tag) {
            if (tag['Key'] === "Name") 
            {
              name = tag['Value'];
            }
          });
          console.log("Name: " + name + "\t\tPub. IP: " + instance.PublicIpAddress);
        });
      });
    }
  }
});

