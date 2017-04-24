
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
Commands.sort = function(files){
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n").sort();
      process.stdout.write(dataArr.join("\n"));
      process.stdout.write('\n bash > ');
    }
    );
  }
}
Commands.wc = function(files){
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      process.stdout.write(String(dataArr.length));
      process.stdout.write('\n bash > ');
    }
    );
  }}
Commands.uniq = function(files){
  var empArr = [];
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");

      var prevLine = dataArr[0];
      empArr.push(prevLine);
      for(var i = 1; i <dataArr.length; i++){
        if(prevLine!==dataArr[i]){
          empArr.push(dataArr[i]);
        }
         prevLine = dataArr[i];
      }
      process.stdout.write(empArr.join("\n"));
      process.stdout.write('\n bash > ');
    }
    );
  }

}

Commands.curl = function(done, url){
  var url = url[0];
  request(url).pipe(process.stdout);
  process.stdout.write('\n bash > ');
}
