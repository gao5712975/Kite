/**
 * Created by Yuan on 2016/1/29.
 */
var express = require("./config/express"),
    config = require("./config/config"),
    mongoose = require("mongoose");

var db = mongoose.connect(config.db);

var app = express(db);

app.listen(config.port);

//Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);