/**
 * Created by Yuan on 2016/1/17.
 */
"use strict";

module.exports = {
    db:"mongodb://127.0.0.1/moka",
    port: 8080,
    // Set bodyParser options
    bodyParser: {
        json: {limit: '150kb'},
        urlencoded: {limit: '150kb', extended: true}
    },
    //HTML模板
    templateEngine: 'swig',
    /**
     * 合并文件
     */
    gruntConcat:{
        lib: {
            css: [
                "libs/bootstrap/dist/css/bootstrap-theme.min.css",
                "libs/bootstrap/dist/css/bootstrap.min.css"
            ],
            js: [
                "libs/jquery/dist/jquery.min.js",
                "libs/angular/angular.min.js",
                "libs/bootstrap/dist/js/bootstrap.min.js",
                "libs/angular-cookies/angular-cookies.min.js",
                "libs/angular-ui-router/release/angular-ui-router.min.js"
            ]
        },
        css: [
            "public/build/**/css/*.css"
        ],
        js: [
            "public/build/config.js",
             "public/build/application.js",
             "public/build/*/*.js",
             "public/build/*/*[!tests]*/*.js"
        ]
    },
    assets: {
        css: [
            "public/build/all.css"
        ],
        js: [
            "public/build/all.js"
        ]
    }
};