var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
const { exec } = require('child_process');
var fs = require('fs-extra');
const homedir = require('os').homedir();
$("#shut").click(function(){
  exec('sudo shutdown -h now');
});
$("#restart").click(function(){
  exec('sudo shutdown -r now');
});
$("#lock").click(function(){
  exec('i3lock');
});
$("#ft").click(function(){
  exec('x-terminal-emulator');
});
$("#fi").click(function(){
  exec('xfe');
});
fs.readdir(homedir + '/usr/admin/Apps/', (err, list) => {
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  $("#apps").append('<li><a class="dropdown-item" href="' + homedir + '/usr/admin/Apps/' + item + '/index.html" target="_blank">' + item + '</a></li>');
}
});
function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}
function updateClock() {
    var now = new Date() // current date
    var d = formatDate(now);
    document.getElementById('time').innerHTML = d;
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call

fs.readdir('/usr/share/applications/', (err, list) => {
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(mApps);
  function mApps(item) {
    //console.log(item);
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream('/usr/share/applications/' + item)
    });
    //var xx = 0;
    lineReader.on('line', function (line) {
      //console.log('Line from file:', line);
      if(line.startsWith("Exec=") == true){
        line = line.slice(5);
        if(line != 'UXTerm' && line != 'Htop' && line != 'Tint2' && line != 'Vim' && line != 'Tint2 Settings' && line != 'Python (v2.7)' && line != 'Python (v3.7)'){
          var ex = line.toLowerCase();
          console.log(line);
          //xx += 1;
          //var te = 'app' + xx;


          //var xx = 0;
          lineReader.on('line', function (line2) {
            //console.log('Line from file:', line);
            if(line2.startsWith("Name=") == true){
              line2 = line2.slice(5);
              console.log('line2');
              $("#apps").append('<li><a class="dropdown-item" href="#" id="' + line2 + '">' + line2 + '</a></li>');
              $("#" + line2).click(function(){
                exec(line);
              });
            };
          });

        }
      }
    });
    //var data = fs.readFileSync('/usr/share/applications/' + item, 'utf8');
    //console.log(data);
  }
});
