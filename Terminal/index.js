var fs = require('fs-extra');
const homedir = require('os').homedir();
var d = '/';
var home = homedir + '/usr/admin';
$('body').terminal({
    help: function() {
        this.echo('ls: list\ncd "dir": change dir\ncat "file": read file\nopen "file": opens file\nrun "app": reun an app\ngit clone: add app or theme\ngit pull: update app or theme');
    },
    ls: function() {
      console.log(home + d);
      fs.readdir(home + d, (err, list) => {
        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        list.forEach(myApps);
      function myApps(item) {
        console.log(item);
        this.echo(item + '\n');
      }
      });
    }
  },
    {
        greetings: greetings.innerHTML + '\n\nType help if you need it.\n\n'
});
