angular.module('myApp',['ui.router','LocalStorageModule'])


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
    .state('view', {
      url: "/view/:id",
      templateUrl: "src/app/views/view.html",
      controller: 'ViewEmailCtrl'
    })
    .state('config', {
      url: "/config",
      templateUrl: "src/app/views/config.html",
      controller: 'ConfigCtrl'
    });
})

.controller('AppCtrl', function AppCtrl($scope, $rootScope, configService) {

	$scope.var = 'Welcome to email system';

  var init = function() {
    var temp = configService.getSkinVariant();
    $rootScope.skinVariant = temp;
  };

  init();

  $rootScope.$on("updateSkin", function(event,skinVariant) {
    $rootScope.skinVariant = skinVariant;
  });

})

.run();