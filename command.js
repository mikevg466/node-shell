
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var fs = require('fs');

var Commands = module.exports = {};
Commands.pwd = function(){
  process.stdout.write(process.cwd());
  process.stdout.write('\nbash > ');
}
Commands.date = function(){
  var date = new Date();
  process.stdout.write(weekday[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.toTimeString());
  process.stdout.write('\nbash > ');
}
Commands.ls = function(){
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    files.forEach(function(file) {
      process.stdout.write(file.toString() + "\n");
    });
    process.stdout.write('\nbash > ');
  });
}
Commands.echo = function(args){
  process.stdout.write(args.join(" "));
  process.stdout.write('\n bash > ');
}
