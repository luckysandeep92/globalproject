'use strict';

/* App Module */
//console.log("hii");
var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'phoneControllers'
]);
phonecatApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/user', {
                    templateUrl: 'user/userlisting.html',
                    controller: 'UserListCtrl'
                }).
                when('/user/create', {
                    templateUrl: 'user/createuser.html',
                    controller: 'UserCreateCtrl'
                }).
                when('/user/update/:userId', {
                    templateUrl: 'user/createuser.html',
                    controller: 'UserUpdateCtrl'
                }).
                      
                when('/search/:phoneId', {
                    templateUrl: 'company-detail.html',
                    controller: 'PhoneDetailCtrl'
                }).
//                when('/create', {
//                    templateUrl: 'createuser.html',
//                    controller: 'UserCreateCtrl'
//                }).
                when('/listing', {
                    templateUrl: 'userlisting.html',
                    controller: 'UserListingCtrl'
                }).
                otherwise({
                    redirectTo: '/search'
                });
    }]);

