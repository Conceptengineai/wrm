/*var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});*/

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Add headers
app.use(function (req, res, next) {
    //Website I wish to allow connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

require('./server.routes')(app);

app.use(express.static(path.join(__dirname, '/../')));
app.get('*', (req, res) => {    
    res.sendFile('index.html', { root: path.resolve(__dirname, '../dist') });
});

app.listen(8081);
console.log('Listening on port 8081');