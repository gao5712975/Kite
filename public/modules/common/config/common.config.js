/**
* Created by Yuan on 2016/1/30.
*/
angular.module("commonModule").config(["$stateProvider", "$urlRouterProvider",
   function ($stateProvider, $urlRouterProvider) {
       $urlRouterProvider.otherwise("/home");
       $stateProvider.state("home", {
           url: "/home",
           views: {
               "": {
                   templateUrl: "public/modules/common/views/home.html"
               },
               params: {data:undefined}
           }
       }).state("userAdd",{
           url: "/userAdd",
           views:{
               "": {
                   templateUrl: "public/modules/user/views/userAdd.html"
               },
               params: {data:undefined}
           }
       }).state("userList",{
           url:"/userList",
           views:{
               "": {
                   templateUrl: "public/modules/user/views/userList.html"
               },
               params: {data:undefined}
           }
       }).state("purviewList",{
           url:"/purviewList",
           views:{
               "": {
                   templateUrl: "public/modules/purview/views/purviewList.html"
               },
               params: {data:undefined}
           }
       }).state("purviewAdd",{
           url:"/purviewAdd",
           views:{
               "": {
                   templateUrl: "public/modules/purview/views/purviewAdd.html"
               },
               params: {data:undefined}
           }
       })
   }
])

/*
angular.module("commonModule").config(
    ["$provide", "$compileProvider", "$stateProvider", "$urlRouterProvider",
        function ($provide, $compileProvider, $stateProvider, $urlRouterProvider) {
            /!**
             * 默认/index 锚点
             *!/
            $urlRouterProvider.otherwise("/index");
            $stateProvider.state("index", {
                url: "/index",
                views: {
                    "": {
                        templateUrl: "public/modules/common/views/home.html"
                    }
                }
            });

            /!**
             * app.config 加载在angular注册服务之前，无法注入$http 请允许我的无耻。
             * 不知道后续会不会有问题。
             *!/
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
        }]);*/
