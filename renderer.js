var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
const { exec } = require('child_process');
var fs = require('fs-extra');
const homedir = require('os').homedir();
$("#shut").click(function(){
  exec('shutdown -h now');
});
$("#restart").click(function(){
  exec('shutdown -r now');
});
$("#lock").click(function(){
  exec('i3lock -i teaos.png');
});
$("#ft").click(function(){
  exec('x-terminal-emulator');
});
$("#fi").click(function(){
  exec('xfe');
});
$("#s").click(function(){
  exec('gnome-control-center');
});
fs.readdir(homedir + '/Apps/Tea/', (err, list) => {
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  $("#apps").append('<li><a class="dropdown-item" href="' + homedir + '/Apps/' + item + '/index.html" target="_blank">' + item + '</a></li>');
}
});
fs.readdir(homedir + '/Apps/Node/', (err, list) => {
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  var sid = item.replace(/\s/g, '');
  $("#apps").append('<li><a class="dropdown-item" href="#" id="' + sid + '" title="' + item + '">' + item + '</a></li>');
  $("#" + sid).click(function(){
    exec('npm --prefix ' + homedir + '/Apps/Node/ test');
  });
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
    var xx = 'yes';
    lineReader.on('line', function (line) {
      //console.log('Line from file:', line);
      if(line.startsWith("Exec=") == true && xx == 'yes'){
        xx = 'no';
        line = line.slice(5);
          var ex = line.toLowerCase();
          //console.log(line);
          //xx += 1;
          //var te = 'app' + xx;


          //var xx = 0;
          var lineReader2 = require('readline').createInterface({
            input: require('fs').createReadStream('/usr/share/applications/' + item)
          });
          lineReader2.on('line', function (line2) {
            //console.log('Line from file:', line);
            //console.log(line2);
            if(line2.startsWith("Name=") == true){
              line2 = line2.slice(5);
              var sid = line2.replace(/\s/g, '');
              //console.log('line2');
              if(line2 != 'UXTerm' && line2 != 'Htop' && line2 != 'Tint2' && line2 != 'Vim' && line2 != 'Tint2 Settings' && line2 != 'Python (v2.7)' && line2 != 'Python (v3.7)' && line2 != 'New Private Browsing Window' && line2 != 'ClipIt' && line2 != 'Access Prompt' && line2 != 'View file' && line2 != 'Network' && line2 != 'Advanced Network Configuration' && line2 != 'Notification Daemon' && line2 != 'Handler for snap:// URIs'){
              $("#apps").append('<li><a class="dropdown-item" href="#" id="' + sid + '" title="' + line + '">' + line2 + '</a></li>');
              $("#" + sid).click(function(){
                line = line.split(" ")[0];
                exec(line);
              });
            }
            }
          });

        //}
      }
    });
    //var data = fs.readFileSync('/usr/share/applications/' + item, 'utf8');
    //console.log(data);
  }
});

// Search
$("#go").click(function(){
  var url = $("#url").val();
  window.open('https://duckduckgo.com/?q=' + url, '_blank', 'top=500,left=200,frame=true, enableRemoteModule: true, nodeIntegration: true, contextIsolation: false');
  //window.location.replace(url);
  //createBrowserWindow(url);
});
/*function createBrowserWindow(url) {
const remote = require('@electron/remote');
const BrowserWindow = remote.BrowserWindow;
const win = new BrowserWindow({
  width: 400,
  height: 300,
  minWidth: 400,
  minHeight: 300,
  webPreferences: { enableRemoteModule: false, nodeIntegration: false, contextIsolation: true }
});
win.setAlwaysOnTop(true);
win.loadURL('https://duckduckgo.com/?q=' + url);
}*/

// updateClock

const hourHand = document.querySelector('.hand-hour');
    const minuteHand = document.querySelector('.hand-minute');
    const secondHand = document.querySelector('.hand-seconds');


    function getTime() {
        const now = new Date();

        const seconds = now.getSeconds();
        const secondsDegree = (((seconds / 60) * 360) + 90);
        secondHand.style.transform = `rotate(${secondsDegree}deg)`


        const minutes = now.getMinutes();
        const minutesDegree = (((minutes / 60) * 360) + 90);
        minuteHand.style.transform = `rotate(${minutesDegree}deg)`


        const hours = now.getHours();
        const hoursDegree = (((hours / 60) * 360) + 90);
        hourHand.style.transform = `rotate(${hoursDegree}deg)`



    }

    setInterval(getTime, 1000);
