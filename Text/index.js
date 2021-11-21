var $ = require( "jquery" );
window.$ = $;
require('bootstrap');
const homedir = require('os').homedir();
var root = '/Documents/';
$("#save").click(function(){
  var con = $("#con").text();
  var title = $("#title").text();
  fs.writeFileSync( homedir + root + title, con);
});
