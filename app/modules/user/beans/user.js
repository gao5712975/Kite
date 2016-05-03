/**
 * Created by Yuan on 2016/1/30.
 */
"use strict";
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: {type: String},
    gender: {type: Number, min: 0, max: 1},
    email: String,
    phone: String,
    user: String,
    password: String,
    create_time: {type: Date, default: new Date()},
    update_time: {type: Date, default: new Date()}
});

/*methods 绑定在模型上的方法*/

/*statics 静态方法 模型和实体都能调用*/
/**
 * 根据ID查询
 * @param id String
 * @param callback
 */
UserSchema.statics.findById = function (id, callback) {
    this.find({_id: id}, {__v: 0}, callback);
};

/**
 * 根据传入的参数查询 例子：{_id:id}
 * @param options Object
 * @param callback
 */
UserSchema.statics.findByOptions = function (options, callback) {
    this.find(options, {__v: 0}, callback);
};
/**
 * 删除 根据条件删除  {_id:id}
 * @param options Object
 * @param callback
 */
UserSchema.statics.removeUser = function (options, callback) {
    this.remove(options, callback);
};

module.exports = UserSchema;