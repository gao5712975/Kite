/**
 * Created by Yuan on 2016/2/21.
 */
var purview = require("../controller/purview");

module.exports = function (app) {
    app.post("/purviewSaveUrl",purview.purviewSave);
    app.post("/purviewModifyUrl",purview.purviewModify);
    app.post("/purviewListUrl",purview.purviewList);
    app.post("/purviewEntityUrl",purview.purviewEntity);
    app.post("/purviewDeleteUrl",purview.purviewDelete);
    app.post("/purviewFindMenuAndFunUrl",purview.purviewFindMenuAndFun);
    app.post("/purviewListResult",purview.purviewListResult);
};