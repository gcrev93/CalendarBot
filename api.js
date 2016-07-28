var aad = require("./aad");
var config = require("./config.js");
var superagent = require("superagent");
var iso = require('iso8601.js');
var baseuri = "https://graph.microsoft.com/beta"
var env = require('./env.js');
var sectionsuri;
var refresh = process.env.ACCESS_TOKEN;
var accessToken;

var day = iso.date(new Date());

q_day = "start/dateTime gt '" + day + "T12:00:00.0000000' and start/dateTime lt '" + day + "T23:30:00.0000000'" //6 AM to 5:30 PM

function getToken(cb) {
     if (!accessToken) {
        aad.refreshToken(refresh, config, function(err, x){
          if(err)
            cb(err);
          else
            cb(null, x.access_token);
            
        });
     } else {
       cb(null, accessToken);
     }
}


function getEvents(cb){
 
  getToken(function (err, token) {
    if (err)
      cb(err);
    else {
      superagent
      .get(baseuri + '/me/events/') 
        .query({'$filter': q_day})
        .query({'$orderby': 'start/dateTime'})
        .set("Authorization", token)
        .set("Accept", "application/json")
        .end((err, result) => {
          if(err)
            cb(err)
          else
            cb(null, JSON.parse(result.text))
        });
    }
  });
  
}


exports.getEvents = getEvents;
