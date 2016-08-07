var Gpio = require('onoff').Gpio,
   button = new Gpio(18, 'in', 'both');
 
button.watch(function(err, value) {
  	console.log(value);
});
