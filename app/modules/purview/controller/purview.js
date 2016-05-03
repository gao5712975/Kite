/**
 * Created by Yuan on 2016/2/21.
 */
var mongoose = require("mongoose");
var Purview = mongoose.model("Purview");

exports.purviewSave = function (req, res) {
    var purview = new Purview(req.body);
    purview.save();
    res.send({status:0});
};

exports.purviewModify = function (req, res) {
    if(req.body._id){
        var purview = new Purview(req.body);
        Purview.update({_id:req.body._id},purview, function (err, data) {
            res.send({status:0});
        })
    }
};

exports.purviewEntity = function (req, res) {
    Purview.findById(req.body, function (err, data) {
        res.send(data);
    })
};

exports.purviewList = function (req, res) {
    Purview.findByOptions(req.body,function (err, data) {
        res.send(data);
    })
};

exports.purviewListResult = function (req, res) {
    Purview.purviewListResult(req.body,function (err, data) {
        res.send(data);
    })
};

exports.purviewFindMenuAndFun = function (req, res) {
    Purview.purviewFindMenuAndFun(req.body,function (err, data) {
        res.send(data)
    })
};

exports.purviewDelete = function (req, res) {
    var purview = new Purview(req.body);
    purview.remove();
    res.send({status:0});
};