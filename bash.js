
var chalk = require('chalk');

// Output a prompt
process.stdout.write(chalk.blue('bash > '));

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline
  var cmdArgs = cmd.split(" ").slice(1);
  cmd = cmd.split(" ")[0];
  var done = function(result, err){
    if(err){
      process.stderr.write(chalk.red(result));
    } else{
      process.stdout.write(result);
    }
    process.stdout.write(chalk.blue("\nbash > "));
  }

  // process.stdout.write('You typed: ' + cmd);
  var bash = require("./command.js");
  if(bash.hasOwnProperty(cmd)) bash[cmd](done, cmdArgs);
  else done('Command Not Found: ' + cmd , true);
});
