/**
 * Created by Yuan on 2015/12/29.
 */
'use strict';
var mongoose = require("mongoose");
var UserSchema = require("../beans/user");

var User = mongoose.model('User', UserSchema);

module.exports = User;
