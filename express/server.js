var express = require('express')
var app = express()
var config = require('../config.json');
var data = require('./data.json');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get(config.data.uri, function (req, res) {
    res.json(data);
})

app.listen(config.data.port, function () {
    console.log('Mock Data Server on port %d', config.data.port)
})