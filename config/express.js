/**
 * Created by Yuan on 2016/1/30.
 */
"use strict";
var express = require("express"),
    config = require("./config"),
    path = require("path"),
    nwPath = process.execPath,
    nwDir = path.dirname(nwPath),
    morgan = require("morgan"),
    compress = require('compression'),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    flash = require("connect-flash"),
    consolidate = require("consolidate"),
    swig = require("./template")(),
    fs = require("fs");

module.exports = function (db) {
    // Initialize express app
    var app = express();

    // Showing stack errors
    app.set('showStackError', false);

    //静态文件 // Setting the app router and static folder
    app.use("/public", express.static(path.resolve("./public")));
    app.use("/static", express.static(path.resolve("./static")));
    app.use("/libs", express.static(path.resolve("./libs")));

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');
    app.set('views', './app/modules/views');

    // Enable logger (morgan)
    //app.use(morgan('dev'));

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.json(config.bodyParser.json));// for parsing application/json
    app.use(bodyParser.urlencoded(config.bodyParser.urlencoded));// for parsing application/x-www-form-urlencoded
    app.use(methodOverride());

    // CookieParser should be above session
    app.use(cookieParser());

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());

    //首页加载
    app.get("/", function (req, res) {
        res.render("index", {
            title: "风筝"
        })
    });

    app.get("/favicon", function (req, res) {
        fs.readFile("./static/icon/favicon.png", "binary", function (err, data) {
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            res.write(data, "binary");
            res.end();
        });
    });

    //加载配置的js插件、css文件和自定义插件和样式
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();

    // Globbing model files
    config.getGlobbedFiles("./app/modules/**/model/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(db);
    });

    // Globbing routes files
    config.getGlobbedFiles("./app/modules/**/routes/*.js").forEach(function (modelPath) {
        require(path.resolve(modelPath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function (err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();
        // Log it
        console.error(err.stack);
        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function (req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });



    return app;
};