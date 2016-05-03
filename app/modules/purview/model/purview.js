/**
 * Created by Yuan on 2016/2/21.
 */
var mongoose = require("mongoose");
var PurviewSchema = require("../beans/purview");
var Purview = mongoose.model("Purview",PurviewSchema);
module.exports = Purview;