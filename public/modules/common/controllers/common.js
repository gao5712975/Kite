/**
 * 通用控制器 菜单directive controller
 * Created by Yuan on 2016/2/1.
 */

angular.module("commonModule").directive("menus",
    [function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                menus: "="
            },
            templateUrl: "public/modules/common/views/menu.html",
            compile: function (tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        /**
                         * ng-class
                         * @type {Array}
                         */
                        var active = [];
                        /**
                         * ng-show
                         * @type {Array}
                         */
                        var display = [];
                        /**
                         * 菜单的显示隐藏
                         * @param event
                         */
                        scope.show = function (event) {
                            var index = angular.element(event.target).attr("index");
                            active[+index] == true ? active[+index] = display[+index] = false : active[+index] = display[+index] = true;
                            scope.active = active;
                            scope.display = display;
                        };
                    }
                }
            }
        }
    }]);

/**
 * 获取菜单栏
 */
angular.module("commonModule").controller("menusController",
    ["$scope", "$rootScope", "PurviewFactory",
        function ($scope, $rootScope, PurviewFactory) {
            $scope.menu = [];
            PurviewFactory.purviewList({
                isMenu: 1
            }).success(function (data, status, headers, config) {
                data.forEach(function (ob, index) {
                    (function (bo) {
                        PurviewFactory.purviewList({
                            parentId: bo._id, isMenu: 0
                        }).success(function (data, status, headers, config) {
                            /**
                             * 没有子菜单的将不显示
                             */
                            if (data.length > 0) {
                                bo.menus = data;
                                $scope.menu.push(bo);
                            }
                        });
                    })(ob)
                })
            });
        }]);