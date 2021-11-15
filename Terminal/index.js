var $ = require( "jquery" );
window.$ = $;
$('body').terminal({
    hello: function(what) {
        this.echo('Hello, ' + what + '. Wellcome to this terminal.');
    }
  },
    {
        greetings: greetings.innerHTML + '\n\nShip: SANS504 \nChief Security Officer \nhelp to start. \ntype exit to exit\n\n'
});
