/**
 * Created by Yuan on 2016/2/21.
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PurviewSchema = new Schema({
    name: String,
    stateName: String,
    url: String,
    templateUrl: String,
    parentId: String,
    order: Number,
    isMenu: {type: Number, default: 1},
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});

/**
 * 根据ID查询
 * @param id String
 * @param callback
 */
PurviewSchema.statics.findById = function (id, callback) {
    this.find({_id: id}, {__v: 0}, callback);
};

/**
 * 根据传入的参数查询 例子：{_id:id}
 * @param options Object
 * @param callback
 */
PurviewSchema.statics.findByOptions = function (options, callback) {
    this.find(options, {__v: 0}, callback);
};

PurviewSchema.statics.purviewListResult = function (options, callback) {
    this.find(options, {name:1,stateName:1,_id:0},callback).in("isMenu", [0, 2])
};

/**
 * 查询purview菜单和功能 0 菜单 2 功能
 * @param callback
 */
PurviewSchema.statics.purviewFindMenuAndFun = function (options, callback) {
    this.find(options, {__v: 0},callback).in("isMenu", [0, 2])
};

/**
 * 删除 根据条件删除  {_id:id}
 * @param options Object
 * @param callback
 */
PurviewSchema.statics.removePurview = function (options, callback) {
    this.remove(options, callback);
};

module.exports = PurviewSchema;
