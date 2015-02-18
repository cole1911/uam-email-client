angular.module('myApp')

.controller('ConfigCtrl', function($rootScope,$scope, localStorageService) {
	var DEFAULT_INTERVAL=10000;
	var DEFAULT_SKIN='default';
	$scope.m = "Config";

	$scope.skins = [{"key":1,"value":"default"},{"key":2,"value":"red"},{"key":3,"value":"green"}];

	$scope.save = function() {
		localStorageService.set("inboxInterval",$scope.inboxInterval);
		localStorageService.set("skinVariant",$scope.skinVariant);
		$rootScope.$emit("updateInterval");
	};

	var init = function() {
		if(localStorageService.get("inboxInterval") !== null) {
			$scope.inboxInterval = localStorageService.get("inboxInterval");
		} else {
			$scope.inboxInterval = DEFAULT_INTERVAL;
		}
		if(localStorageService.get("skinVariant") !== null) {
			$scope.skinVariant = localStorageService.get("skinVariant");
		} else {
			$scope.skinVariant = DEFAULT_SKIN;
		}
	};

	init();
});