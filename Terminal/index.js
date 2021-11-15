// In body tag
$('body').terminal({
	iam: function (name) {
		this.echo('Hello, ' + name +
			'. Welcome to GeeksForGeeks');
	}
}, {
	greetings: 'GeeksForGeeks - A place to'
			+ ' learn DS, Algo and Computer'
			+ ' Science for free'
});
