angular.module('myApp',['ui.router'])


.config(function($stateProvider) {
	$stateProvider
    .state('inbox', {
      url: "/inbox",
      controller: 'InboxCtrl',
      templateUrl: "src/app/views/main.html"
    })
    .state('sent', {
      url: "/sent",
      templateUrl: "src/app/views/sent.html",
      controller: 'SentCtrl'
    })
    .state('new', {
      url: "/new",
      templateUrl: "src/app/views/new-email.html",
      controller: 'NewEmailCtrl'
    })
    .state('email', {
      url: "/email/:id",
      templateUrl: "src/app/views/email.html"
    });
})

.controller('AppCtrl', function AppCtrl($scope, $rootScope) {

	$scope.var = 'Hello World';
})

.run();