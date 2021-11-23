var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
const { exec } = require('child_process');
var fs = require('fs-extra');
const homedir = require('os').homedir();
const { BrowserWindow } = require('@electron/remote');
const express = require("express");
const app = express();
const webCastDocDir = homedir + "/www/";
const helper = require(homedir + "/TEAhouse/helpers/helpers");
app.use(express.static(webCastDocDir));
const dirTree = require("directory-tree");

let treeData = dirTree(webCastDocDir);

let filesListHtml = helper.getList(treeData, ``, "");

let filesHtml = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>WebCast</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/file-icons-js/css/style.css" />

        <link rel="stylesheet" href="/index.css" />

  <div class="jumbotron" style="text-align:center;">
    <img src="/Logo_WhiteBackground.png" width="400" />
  </div>

  <div id="container">
    <div id="treeContainer">
    <ul>
${filesListHtml}
</ul>
      </div>

</div>
<script src="/jquery/dist/jquery.js"></script>

<script src="/webcast.js"></script>
</body>
    </html>`;

/// make doc



/*app.get("/", (req, res) => {
  if (!fs.existsSync(`${webCastDocDir}index.html`)) {
    res.send(filesHtml);
  }
});*/
var www = fs.readFileSync( homedir + "/Data/TEAhouse/www.txt" );
console.log(www);
if(www == "on"){
app.listen(8080, () => {
  console.log(`WebCast listening at http://localhost:8080`);
});
}
//var devip = require('dev-ip');
//import {internalIpV6, internalIpV4} from 'internal-ip';
//$('#ip').text(devip());
//const { networkInterfaces } = require('os');
const os = require("os");
const ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    var myIP = "";
    var cmyIP = "";
    var amyIP = "";
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      cmyIP += `http://${iface.address}:8080`;
    } else {
      // this interface has only one ipv4 adress
      cmyIP += `http://${iface.address}:8080`;
    }
    ++alias;
    $("#ip").html(' <a href="' + cmyIP + '" target="_blank">' + cmyIP + '</a> ');
    /*$("#localAdd").click(function () {
      shell.openExternal(cmyIP);
    });*/
  });
});
/*const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}*/
//$('#ip').text(results["en0"][0]);
//console.log(results);
$("#shut").click(function(){
  exec('shutdown -h now');
});
$("#restart").click(function(){
  exec('shutdown -r now');
});
$("#lock").click(function(){
  exec('i3lock -i teaos.png --tiling');
});
/*$("#ft").click(function(){
  exec('x-terminal-emulator');
});*/
$("#fi").click(function(){
  exec('xfe');
});
$("#s").click(function(){
  exec('gnome-control-center');
});
console.log(homedir + '/Apps/Tea/');
fs.readdir(homedir + '/Apps/Tea/', (err, list) => {
  if(!err){
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  $("#apps").append('<li><a class="dropdown-item" href="#" id="' + item + '">' + item + '</a></li>');
  $("#" + item).click(function(){
    //window.open('homedir + '/Apps/' + item + '/index.html', '_blank', 'top=500,left=200,frame=true, enableRemoteModule: true, nodeIntegration: true, contextIsolation: false');
    createBrowserappWindow(homedir + '/Apps/Tea/' + item + '/index.html');
    //console.log('test');
  });
  function createBrowserappWindow(url1) {
  //const remote = require('@electron/remote');
  //const BrowserWindow = remote.BrowserWindow;
let win2 = new BrowserWindow({
    width: 400,
    height: 300,
    minWidth: 400,
    minHeight: 300,
    webPreferences: { enableRemoteModule: true, nodeIntegration: true, contextIsolation: false }
  });
  //win2.setAlwaysOnTop(true);
  win2.loadFile(url1);
}
}
}
});
fs.readdir(homedir + '/Apps/Node/', (err, list) => {
  if(!err){
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  list.forEach(myApps);
function myApps(item) {
  var sid = item.replace(/\s/g, '');
  $("#apps").append('<li><a class="dropdown-item" href="#" id="' + sid + '" title="' + item + '">' + item + '</a></li>');
  $("#" + sid).click(function(){
    exec('npm --prefix ' + homedir + '/Apps/Node/ test');
  });
}
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
/*function updateClock() {
    var now = new Date() // current date
    var d = formatDate(now);
    document.getElementById('time').innerHTML = d;
    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call*/

/*fs.readdir('/usr/share/applications/', (err, list) => {
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
              var sid = line2.replace('(', '');
              sid = line2.replace(')', '');
              sid = line2.replace(/\s/g, '');
              sid = line2.replace('&', '');
              //console.log('line2');
              if(line2 != 'UXTerm' && line2 != 'Htop' && line2 != 'Tint2' && line2 != 'Vim' && line2 != 'Tint2 Settings' && line2 != 'Python (v2.7)' && line2 != 'Python (v3.8)' && line2 != 'Python (v3.7)' && line2 != 'New Private Browsing Window' && line2 != 'ClipIt' && line2 != 'Access Prompt' && line2 != 'View file' && line2 != 'Network' && line2 != 'Advanced Network Configuration' && line2 != 'Notification Daemon' && line2 != 'Handler for snap:// URIs'){
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
});*/

// Search
$("#go").click(function(){
  var url = $("#url").val();
  //window.open('https://duckduckgo.com/?q=' + url, '_blank', 'top=500,left=200,frame=true, enableRemoteModule: true, nodeIntegration: true, contextIsolation: false').setalwaysontop("true");
  //window.location.replace(url);
  $("#url").val("");
  createBrowserWindow(url);
});
function createBrowserWindow(url) {
//const remote = require('@electron/remote');
//const BrowserWindow = remote.BrowserWindow;
let win = new BrowserWindow({
  width: 400,
  height: 300,
  minWidth: 400,
  minHeight: 300,
  webPreferences: { enableRemoteModule: false, nodeIntegration: false, contextIsolation: true }
});
win.setAlwaysOnTop(true);
win.loadURL('https://duckduckgo.com/?q=' + url);
}

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

// context menu
/*const {remote} = require('electron')
         const {Menu, MenuItem} = remote

         const menu = new Menu()

         // Build menu one item at a time, unlike
         menu.append(new MenuItem ({
            label: 'MenuItem1',
            click() {
               console.log('item 1 clicked')
            }
         }))

         menu.append(new MenuItem({type: 'separator'}))
         menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))
         menu.append(new MenuItem ({
            label: 'MenuItem3',
            click() {
               console.log('item 3 clicked')
            }
         }))

         // Prevent default action of right click in chromium. Replace with our menu.
         window.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            menu.popup(remote.getCurrentWindow())
         }, false)*/
