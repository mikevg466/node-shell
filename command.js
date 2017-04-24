
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const fs = require('fs');
const request = require('request');

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
    done("Specify a file.", true);
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
    done("Specify a file.", true);
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
    done("Specify a file.", true);
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
    done("Specify a file.", true);
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n").sort();
      done(dataArr.join("\n"));
    }
    );
  }
}
Commands.wc = function(files){
  if(!files.length){
    done("Specify a file.", true);
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      done(String(dataArr.length));
    }
    );
  }}
Commands.uniq = function(files){
  var empArr = [];
  if(!files.length){
    done("Specify a file.", true);
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
      done(empArr.join("\n"));
    }
    );
  }

}

Commands.curl = function(done, url){
  var url = url[0];
  // request(url).pipe(process.stdout);
  request(url, function(err, response, body){
    if(err) throw err;
    else if(!body) done("No Body found", true);
    else done(body);
  });
}
