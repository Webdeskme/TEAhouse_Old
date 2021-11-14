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
