exports.hello = function(req, res) {
    res.render('helloworld.html', {title: 'Hello World'});
}