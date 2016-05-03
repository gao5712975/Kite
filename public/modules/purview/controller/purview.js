/**
 * Created by Yuan on 2016/2/21.
 */
/**
 * 权限 CRUD
 */
angular.module("purviewModule").controller("purviewAddController",
    ["$scope", "$http", "$rootScope", "$state", "PurviewFactory",
        function ($scope, $http, $rootScope, $state, PurviewFactory) {
            /**
             * purview Entity
             * @type {{}}
             */
            $scope.purview = {};
            /**
             * 监听模型变化
             * $watch(watchExpression, listener, objectEquality);
             * watchExpression：监听的对象
             * listener:回调函数 function (newValue, oldValue, scope){}
             * objectEquality：是否深度监听
             */
            $scope.$watch("purview.stateName", function (newValue, oldValue, scope) {
                if ($scope.purview.stateName) {
                    $scope.purview.url = "/" + $scope.purview.stateName;
                }
            });

            /**
             * isPurviewChild == true 子菜单的添加
             * isPurviewChild == false 模板修改
             */
            if ($rootScope.params.isPurviewChild) {
                $rootScope.params.purviewChild = true;
                $scope.purview.parentId = $rootScope.params.purviewId;
                /**
                 * 是否是菜单 默认0 是
                 * @type {number}
                 */
                $scope.purview.isMenu = 0;
                /**
                 * 子菜单修改
                 */
                if ($rootScope.params.parentId) {
                    PurviewFactory.purviewList({
                        _id: $rootScope.params.purviewId
                    }).success(function (data, status, headers, config) {
                        $scope.purview = data[0];
                    });
                }
            } else if ($rootScope.params.purviewId) {
                $rootScope.params.purviewChild = false;
                PurviewFactory.purviewList({
                    _id: $rootScope.params.purviewId
                }).success(function (data, status, headers, config) {
                    $scope.purview = data[0];
                });
            } else {
                $rootScope.params.purviewChild = false;
            }
            delete $rootScope.params.purviewId;
            delete $rootScope.params.parentId;
            delete $rootScope.params.isPurviewChild;

            /**
             * save purview
             */
            $scope.purviewSave = function () {
                PurviewFactory.purviewSave($scope.purview)
                    .success(function (data, status, headers, config) {
                        $state.go("purviewList");
                    })
            };

            /**
             * modify purview
             */
            $scope.purviewModify = function () {
                PurviewFactory.purviewModify($scope.purview)
                    .success(function (data, status, headers, config) {
                        $state.go("purviewList");
                    })
            };
        }]);
/**
 * 权限列表
 */
angular.module("purviewModule").controller("purviewListController",
    ["$scope", "$http", "$rootScope", "$state", "PurviewFactory",
        function ($scope, $http, $rootScope, $state, PurviewFactory) {
            /**
             * 模块
             * @type {Array}
             */
            $scope.purviewModules = [];
            $scope.purviews = [];
            PurviewFactory.purviewList({
                isMenu: 1
            }).success(function (data, status, headers, config) {
                if (data.length > 0) {
                    $scope.purviewModules = data;
                    PurviewFactory.purviewFindMenuAndFun({parentId:data[0]._id})
                        .success(function (data, status, headers, config) {
                            $scope.purviews = data;
                        });
                }
            });

            /**
             * 权限
             * @type {Array}
             */
            $scope.purviewChildSelect = function (id) {
                PurviewFactory.purviewFindMenuAndFun({
                    parentId: id
                }).success(function (data, status, headers, config) {
                    $scope.purviews = data;
                })
            };

            /**
             * 添加 模块
             * @param bo false 如果为false purviewAdd页面不显示其它input
             */
            $scope.purviewModuleAdd = function (bo) {
                $rootScope.params.isPurviewChild = bo;
                $state.go("purviewAdd");
            };

            /**
             * 添加 子菜单
             * @param id 模块ID 传入模块ID
             * @param bo true 如果为true purviewAdd页面显示其它input
             */
            $scope.purviewChildAdd = function (bo, id) {
                $rootScope.params.purviewId = id;
                $rootScope.params.isPurviewChild = bo;
                $state.go("purviewAdd");
            };
            /**
             * purview modify
             * @param id
             * @param bo
             * @param parentId
             * bo == true 为子菜单的修改 反则模块的修改
             */
            $scope.purviewUpdate = function (bo, id, parentId) {
                $rootScope.params.purviewId = id;
                $rootScope.params.parentId = parentId;
                $rootScope.params.isPurviewChild = bo;
                /**
                 * 新增页面和修改页面公用时，进入修改页面时，
                 * 需要传入导航名称，不传则显示原有的新增**导航名称
                 */
                $state.go("purviewAdd",{data:"修改权限"});
            };
            /**
             * purview delete
             * @param id
             */
            $scope.purviewDelete = function (id) {
                PurviewFactory.purviewDelete({
                    _id: id
                }).success(function (data, status, headers, config) {
                    /**
                     * TODO 不能在控制器里面操作dom元素 暂时
                     */
                    angular.element($("#" + id)).remove();
                });
            };
        }]);