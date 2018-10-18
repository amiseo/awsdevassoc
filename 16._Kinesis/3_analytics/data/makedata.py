import json 

alldata = []

with open("rawdata.csv") as fp:  
   line = fp.readline()
   cnt = 1
   while line:
       #print("Line {}: {}".format(cnt, line.strip()))
       s = line.strip().split(",")
       j = {}
       j["ts"] = s[0]
       j["uid"] = s[1]
       j["ax"] = s[2]
       j["ay"] = s[3]
       j["az"] = s[4]
       j["tc"] = s[5]
       alldata.append(j)
       line = fp.readline()
       cnt += 1

#print json.dumps(alldata)
data_file = open('./data.json', 'w')
data_file.write(json.dumps(alldata))
data_file.close()

