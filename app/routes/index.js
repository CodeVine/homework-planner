exports.hello = function(req, res) {
    res.render('main.html', {title: 'Hello World'});
}