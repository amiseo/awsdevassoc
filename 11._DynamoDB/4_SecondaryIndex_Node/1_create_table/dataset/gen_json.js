var fs = require('fs');
var CSV = require('csv-string');

var count = 0;

//var pstream = fs.createWriteStream('athlete_events.puts');

var jstream = fs.createWriteStream('athlete_events.json'); //is not valid json file, just lines for line-by-line parsing

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};


var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('athlete_events.csv')
});

lineReader.on('line', function (line) {
  // Ignore the header line
  if (count == 0) {
    count++;
    return;
  }
  //if (count > 1) {
    //pstream.write('\n');
  //}

  //var s = line.replaceAll('"', '').replaceAll(', Jr', ' Jr').replaceAll('-,', '-').split(",");
  //0"ID",1"Name",2"Sex",3"Age",4"Height",5"Weight",6"Team",7"NOC",8"Games",9"Year",10"Season",11"City",12"Sport",13"Event",14"Medal"
  //NOTE: ID in CSV data can duplicate for the same person, use line count as id as that's our primary key.
  var csv = CSV.parse(line);
  var s = csv[0];


  //NOTE: height/weight can be NA, just leave as string
  var h = (s[4] === "NA" ? "0" : s[4]);
  var w = (s[5] === "NA" ? "0" : s[5]);
  var a = (s[3] === "NA" ? "0" : s[3]);
/*
  var p = {
            'id':{'N':String(count)},
            'name':{'S':s[1]},
            'sex':{'S':s[2]},
            'age':{'N':a},
            'height':{'S':h},
            'weight':{'S':w},
            'team':{'S':s[6]},
            'noc':{'S':s[7]},
            'games':{'S':s[8]},
            'year':{'N':s[9]},
            'season':{'S':s[10]},
            'city':{'S':s[11]},
            'sport':{'S':s[12]},
            'evt':{'S':s[13]},
            'medal':{'S':s[14]},
          };
*/
  var j = {
            'id':count,
            'name':s[1],
            'sex':s[2],
            'age':parseInt(a),
            'height':parseInt(h),
            'weight':parseInt(w),
            'team':s[6],
            'noc':s[7],
            'games':s[8],
            'year':parseInt(s[9]),
            'season':s[10],
            'city':s[11],
            'sport':s[12],
            'evt':s[13],
            'medal':s[14],
          };


  //pstream.write(JSON.stringify(p));
  jstream.write(JSON.stringify(j)+"\n");
  count++;
});

lineReader.on('close', function(done) {
  //pstream.end();
  jstream.end();
  console.log("Done, " + count + " items.");
});
