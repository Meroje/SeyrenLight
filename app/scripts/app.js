'use strict';

angular.module('seyrenLightApp', ['config', 'ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'SeyrenLightCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
