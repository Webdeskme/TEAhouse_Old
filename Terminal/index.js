//var fs = require('fs-extra');
//const homedir = require('os').homedir();
$('body').terminal({
    help: function() {
        this.echo('ls: list\ncd "dir": change dir\ncat "file": read file\nopen "file": opens file\nrun "app": reun an app\ngit clone: add app or theme\ngit pull: update app or theme');
    }
  },
    {
        greetings: greetings.innerHTML + '\n\nType help if you need it.\n\n'
});
