/**
 * Created by Yuan on 2016/2/20.
 */
"use strict";
var User = require("../controller/user");

module.exports = function (app) {
    app.post("/userEntityUrl",User.userEntity);
    app.post("/userListUrl",User.userList);
    app.post("/userSaveUrl",User.userSave);
    app.post("/userModifyUrl",User.userModify);
    app.post("/userDeleteUrl",User.userDelete);
};