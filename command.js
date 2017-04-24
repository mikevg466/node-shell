
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var Commands = module.exports = {};
Commands.pwd = function(){
  process.stdout.write(process.cwd());
}
Commands.date = function(){
  var date = new Date();
  process.stdout.write(weekday[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.toTimeString());
}
