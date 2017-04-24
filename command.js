
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var fs = require('fs');
var request = require('request');

var Commands = module.exports = {};
Commands.pwd = function(done){
  done(process.cwd());
}
Commands.date = function(done){
  var date = new Date();
  done(weekday[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.toTimeString());
}
Commands.ls = function(done){
  fs.readdir('.', function(err, files) {
    if (err) throw err;
    var result = "";
    files.forEach(function(file) {
      result += (file.toString() + "\n");
    });
    done(result);
  });
}
Commands.echo = function(done, args){
  done(args.join(" "));
}
Commands.cat = function(done, files){
  if(!files.length){
    done("Specify a file.");
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    }
    );
  }
}
Commands.head = function(done, files){
  if(!files.length){
    done("Specify a file.");
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      var result = ""
      for(var i = 0; i < 5; i++) result += (dataArr[i] + '\n');
      done(result);
    }
    );
  }
  //process.stdout.write('\n bash > ');
}
Commands.tail = function(done, files){
  if(!files.length){
    done("Specify a file.");
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      var result = "";
      for(var i = dataArr.length - 5; i < dataArr.length; i++) result(dataArr[i] + '\n');
    }
    );
  }
  //process.stdout.write('\n bash > ');
}


Commands.curl = function(done, url){
  var url = url[0];
  request(url).pipe(process.stdout);
  process.stdout.write('\n bash > ');
}
