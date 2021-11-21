var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
const homedir = require('os').homedir();
var root = '/Documents/';
$("#save").click(function(){
  var con = document.getElementById(con);
  var title = document.getElementById(title);
  fs.writeFileSync( homedir + root + title, con);
});
