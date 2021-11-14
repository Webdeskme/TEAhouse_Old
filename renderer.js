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
fs.readdir(homedir, (err, list) => {
  list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
  console.log(list);
  list.forEach(myApps);
function myApps(item) {
  $("#apps").append('<li><a class="dropdown-item" href="test.html" target="_blank">' + item + '</a></li>');
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
        /*months = ['January', 'February', 'March']; // you get the idea
        time = now.getHours() + ':' + now.getMinutes(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(),
                months[now.getMonth()],
                now.getFullYear()].join(' ');*/

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = d;

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call
