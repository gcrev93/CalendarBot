var api = require('./api.js');

api.getEvents(function(err,result){
    if(err)
        console.log(err);
    else{
        for(var i = 0; i < result.value.length; i++)
        {
          // console.log(result.value)
           console.log(result.value[i].subject);
           console.log(result.value[i].start);
           console.log(result.value[i].end);
        
    }
        
}
});