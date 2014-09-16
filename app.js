var express = require('express');
var routes = require('./app/routes/index');
var path = require('path');
var engines = require('consolidate');

var app = express();

app.use(express.static(path.join(__dirname, 'app/public')));
app.engine('html', engines.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');
app.disable('x-powered-by');

app.get('/', routes.hello);

app.listen(5672, function() {
    console.log('Listening on port 5672...');
});