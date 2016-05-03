/**
 * Created by Yuan on 2016/2/23.
 */
angular.module("purviewModule").factory("PurviewFactory",
    ["$http",
        function ($http) {
            return {
                purviewList: function (params) {
                    return $http({
                        method: "POST",
                        url: "/purviewListUrl",
                        data: params
                    })
                },
                purviewSave: function (params) {
                    return $http({
                        method: "POST",
                        url: "/purviewSaveUrl",
                        data: params
                    })
                },
                purviewModify: function (params) {
                    return $http({
                        method: "POST",
                        url: "/purviewModifyUrl",
                        data: params
                    })
                },
                purviewDelete: function (params) {
                    return $http({
                        method: "POST",
                        url: "/purviewDeleteUrl",
                        data: params
                    })
                },
                purviewFindMenuAndFun: function (params) {
                    return $http({
                        method: "POST",
                        url: "/purviewFindMenuAndFunUrl",
                        data: params
                    })
                }
            };
        }]);