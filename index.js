var api = require('./api.js');
var say = require('say');
var async = require('async');
var schedule = [];
var count = 0;


api.getEvents(function (err, result) {
    if (err)
        console.log(err);
    else {
        Intro();

        async.times(result.value.length,  function () {
            async.series([
                function (callback) { 
                    Time(result.value[count].start.dateTime);
                    callback();
                },
                function (callback) {      
                    Subject(result.value[count].subject);
                    callback();
                 },
                 function (callback) { 
                    ++count; 
                    callback();
                 },
            ])
        });

        setTimeout(function () {
            say.speak(schedule);
            console.log(schedule);
        }, 3000);
    }

});


function Intro() {
    setTimeout(function () {
        say.speak('todays schedule is');
    }, 1000);
}

function Time(data) {
    var cst = new Date(Date.parse(data));
    var time = cst.toLocaleTimeString();

    schedule.push(time);

}

function Subject(subject){
  subject = subject.replace('1:1','1 on 1');
  subject = subject.replace('1-1','1 on 1');
  subject = subject.replace('FW',''); 

  schedule.push(subject);  
}

