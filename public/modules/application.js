"use strict";
angular.module(ApplicationConfig.moduleName, ApplicationConfig.moduleDependencies).run(
    ['$rootScope', '$state', '$stateParams', "$cookies", "PurviewFactory",
        function ($rootScope, $state, $stateParams, $cookies, PurviewFactory) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            /**
             * 自定义属性存放在params对象中
             * @type {{}}
             */
            $rootScope.params = {};
            $rootScope.params.menus = [];
            $rootScope.params.title = $cookies.get("title") || "首页";

            /**
             * 监听路由的变化。记录导航
             */
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                var toParams = toParams.data;
                if ($rootScope.params.menus.length > 0) {
                    var menus = $rootScope.params.menus;
                    menus.forEach(function (ob) {
                        (function (bo) {
                            bo.menus.forEach(function (da) {
                                if (da.stateName == toState.name) {
                                    var childName = da.name;
                                    if (toParams != undefined) {
                                        childName = toParams;
                                    }
                                    var parentName = bo.name;
                                    $rootScope.params.title = parentName + " > " + childName;
                                    $cookies.put("title", $rootScope.params.title);
                                }
                            })
                        })(ob)
                    })
                } else {
                    /**
                     * 放在 $rootScope上面 保存起来
                     */
                    PurviewFactory.purviewList({
                        isMenu: 1
                    }).success(function (data, status, headers, config) {
                        data.forEach(function (ob) {
                            (function (bo) {
                                PurviewFactory.purviewList({
                                    parentId: bo._id
                                }).success(function (data, status, headers, config) {
                                    /**
                                     * 放在 $rootScope上面 保存起来
                                     */
                                    bo.menus = data;
                                    $rootScope.params.menus.push(bo);
                                });
                            })(ob)
                        })
                    });
                    $rootScope.params.title = "首页";
                }
            });
            /**end*/
        }
    ]
    )
    .filter("dateFormat", function () {
        return function (input) {
            input = new Date(input);
            var year = input.getFullYear();
            var month = input.getMonth()+1;
            var day = input.getDay();
            return year + '-' + month + '-' +day;
        }
    })