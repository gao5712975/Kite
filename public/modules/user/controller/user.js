/**
 * Created by Yuan on 2016/2/20.
 */

angular.module("userModule").controller("userAddControllers",
    ["$scope", "$http", "$rootScope", "$state","UserFactory",
        function ($scope, $http, $rootScope, $state,UserFactory) {
            /**
             * user Entity
             * @type {{}}
             */
            $scope.user = {};
            /**
             * 获取$rootScope上的用户ID 新增页面上存在用户ID，表明是修改操作
             */
            if ($rootScope.params.userId) {
                UserFactory.userList({
                    _id: $rootScope.params.userId
                }).success(function (data, status, headers, config) {
                    $scope.user = data[0];
                });
                delete $rootScope.params.userId;
            }

            /**
             * 保存用户
             */
            $scope.userSave = function () {
                UserFactory.userSave($scope.user)
                    .success(function (data, status, headers, config) {
                        $state.go("userList");
                    });
            };
            /**
             * 修改用户
             */
            $scope.userModify = function () {
                UserFactory.userModify($scope.user)
                    .success(function (data, status, headers, config) {
                        $state.go("userList");
                    });
            }
        }]);

/**
 * 用户列表
 */
angular.module("userModule").controller("userListControllers",
    ["$scope", "$http", "$state", "$rootScope", "UserFactory",
        function ($scope, $http, $state, $rootScope, UserFactory) {
            /**
             * 结果数组
             * @type {Array}
             */
            $scope.users = [];
            /**
             * 查询条件 分页 筛选
             * @type {{}}
             */
            $scope.param = {};
            UserFactory.userList()
                .success(function (data, status, headers, config) {
                    console.info(data);
                    $scope.users = data;
                });

            /**
             * 删除用户
             * @param id
             */
            $scope.userDelete = function (id) {
                UserFactory.userDelete({
                    _id: id
                }).success(function (data, status, headers, config) {
                    angular.element($("#" + id)).remove();
                });
            };

            /**
             * 用户修改
             * @param id
             */
            $scope.userUpdate = function (id) {
                $rootScope.params.userId = id;
                $state.go("userAdd",{data:"修改用户"});
            };

            /**
             * 用户新增
             */
            $scope.userAdd = function () {
                $state.go("userAdd");
            }
        }]);