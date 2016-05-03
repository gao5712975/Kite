/**
 * Created by Yuan on 2016/2/20.
 */
'use strict';
var mongoose = require("mongoose");
var User = mongoose.model('User');

exports.userEntity = function (req, res) {
    User.findById(req.body, function (err, data) {
        res.send(data);
    })
};

exports.userList = function (req, res) {
    User.findByOptions(req.body, function (err, data) {
        res.send(data);
    });
};

exports.userSave = function (req, res) {
    var user = new User(req.body);
    user.save();
    res.send({status: 0})
};

exports.userModify = function (req, res) {
    if (req.body._id) {
        var user = new User(req.body);
        User.update({_id: req.body._id}, user, function (err, data) {
            res.send({status: 0})
        })
    }
};

exports.userDelete = function (req, res) {
    var user = new User(req.body);
    user.remove();
    res.send({status: 0})
};