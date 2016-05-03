/**
 * Created by Yuan on 2016/2/23.
 */
angular.module("userModule").factory("UserFactory",
    ["$http",
        function ($http) {
            return{
                userSave: function (params) {
                    return $http({
                        method: "POST",
                        url: "/userSaveUrl",
                        data: params
                    })
                },
                userList: function (params) {
                    return $http({
                        method: "POST",
                        url: "/userListUrl",
                        data: params
                    })
                },
                userModify: function (params) {
                    return $http({
                        method: "POST",
                        url: "/userModifyUrl",
                        data: params
                    })
                },
                userDelete: function (params) {
                    return $http({
                        method: "POST",
                        url: "/userDeleteUrl",
                        data: params
                    })
                }
            }
        }]);