// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var $ = require( "jquery" );
//const bootstrap = require('bootstrap');
window.$ = $;
require('bootstrap');
var exec = require('child_process').exec;
$("#shut").click(function(){
    exec('shutdown now');
  });
  $("#restart").click(function(){
      exec('shutdown -r');
    });
