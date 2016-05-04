/**
 * Created by Yuan on 2016/2/26.
 */
var all = require("./config/evn/all");
var libJs = all.gruntConcat.lib.js.concat(all.gruntConcat.js);
var libCss = all.gruntConcat.lib.css.concat(all.gruntConcat.css);
/**
 * 合并后最终文件路径
 */
var pathJs = all.assets.js[0];
var pathCss = all.assets.css[0];

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat:{
            options: {
                separator: " ",
                stripBanners: true,
                banner: '/*!gaoyuanfell@sina.com */'
            },
            js:{
                src: libJs,
                dest: pathJs
            },
            css:{
                src: libCss,
                dest: pathCss
            }
        },
        uglify: {
            jsFiles: {
                files: [
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: "public/modules",      // Src matches are relative to this path.
                        src: ["**/*.js"], // Actual pattern(s) to match.
                        dest: "public/build",   // Destination path prefix.
                        ext: ".js",   // Dest filepaths will have this extension.
                        extDot: "first"   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        cssmin:{
            cssFiles:{
                files:[
                    {
                        expand: true,     // Enable dynamic expansion.
                        cwd: "public/modules",      // Src matches are relative to this path.
                        src: ["**/*.css"], // Actual pattern(s) to match.
                        dest: "public/build",   // Destination path prefix.
                        ext: ".css",   // Dest filepaths will have this extension.
                        extDot: "first"   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        watch:{
            scripts:{
                files: ['public/modules/**.js'],
                tasks: tasks,
                options: {
                    interrupt: true
                }
            },
            configFiles:{
                files: ['app/modules/**/**/**.js'],
                options: {
                    reload: true
                }
            }
        }
    });
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    // grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认被执行的任务列表。
    grunt.registerTask("default", ["uglify","cssmin"]);
    grunt.registerTask("watch", ["watch"]);
};