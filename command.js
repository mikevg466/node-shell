
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
Commands.cat = function(files){
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      process.stdout.write(data);
      process.stdout.write('\n bash > ');
    }
    );
  }
  process.stdout.write('\n bash > ');
}
Commands.head = function(files){
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      for(var i = 0; i < 5; i++) process.stdout.write(dataArr[i] + '\n');
      process.stdout.write('\n bash > ');
    }
    );
  }
  //process.stdout.write('\n bash > ');
}
Commands.tail = function(files){
  if(!files.length){
    process.stdout.write("Specify a file.");
    process.stdout.write('\n bash > ');
  }
  else{
    var fileName = './' + files[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      var dataArr = String(data).split("\n");
      for(var i = dataArr.length - 5; i < dataArr.length; i++) process.stdout.write(dataArr[i] + '\n');
      process.stdout.write('\n bash > ');
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