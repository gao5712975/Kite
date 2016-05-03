///**
// * Created by Yuan on 2016/1/30.
// */
//angular.module("commonModule").config(["$stateProvider", "$urlRouterProvider",
//    function ($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider.otherwise("/home");
//        $stateProvider.state("home", {
//            url: "/home",
//            views: {
//                "@": {
//                    templateUrl: "public/modules/common/views/home.html"
//                },
//                "menu@":{
//                    templateUrl: "public/modules/common/views/menu.html"
//                },
//                "user@home":{
//                    templateUrl: "public/modules/user/views/user.html"
//                }
//            }
//        }).state("admin",{
//            url: "/admin",
//            views:{
//                "": {
//                    templateUrl: "public/modules/common/views/admin.html"
//                },
//                "menu":{
//                    templateUrl: "public/modules/common/views/menu.html"
//                },
//                "admin@home":{
//                    templateUrl: "public/modules/admin/views/admin.html"
//                }
//            }
//        }).state("config",{
//            url:"/config",
//            views:{
//                "@": {
//                    templateUrl: "public/modules/common/views/config.html"
//                },
//                "menu@":{
//                    templateUrl: "public/modules/common/views/menu.html"
//                },
//                "config@home":{
//                    templateUrl: "public/modules/config/views/config.html"
//                }
//            }
//        })
//    }
//])

angular.module("commonModule").config(
    ["$provide", "$compileProvider", "$stateProvider", "$urlRouterProvider",
        function ($provide, $compileProvider, $stateProvider, $urlRouterProvider) {
            /**
             * 默认/index 锚点
             */
            $urlRouterProvider.otherwise("/index");
            $stateProvider.state("index", {
                url: "/index",
                views: {
                    "": {
                        templateUrl: "public/modules/common/views/home.html"
                    }
                }
            });

            /**
             * app.config 加载在angular注册服务之前，无法注入$http 请允许我的无耻。
             * 不知道后续会不会有问题。
             */
            jQuery.ajax({
                url: "/purviewFindMenuAndFunUrl",
                type: "POST",
                data: {},
                dataType: "json"
            }).success(function (data) {
                console.info(data);
                data.forEach(function (da) {
                    (function (ob) {
                        $stateProvider.state(ob.stateName, {
                            url: ob.url,
                            views: {
                                "": {
                                    templateUrl: ob.templateUrl
                                }
                            },
                            params: {data:undefined}
                        })
                    })(da)
                })
            });
        }]);