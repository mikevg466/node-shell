// Output a prompt
process.stdout.write('bash > ');

var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline


  // process.stdout.write('You typed: ' + cmd);
  switch(cmd){
    case 'pwd':

      break;
    case 'date':
      var date = new Date();

      process.stdout.write(weekday[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.toTimeString());
      // process.stdout.write(date.toUTCString());
      // process.stdout.write('\n' + date.toTimeString());
      break;
    default:
      break;
  }


  process.stdout.write('\nbash > ');

});
