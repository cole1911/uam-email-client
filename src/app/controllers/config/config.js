angular.module('myApp')

.controller('ConfigCtrl', function($rootScope,$scope, configService) {


	$scope.m = "Config";
	
	$scope.skins = [{ "value": "default", "text": "default" }, { "value": "red", "text": "red" }, { "value": "green", "text": "green" }];

	$scope.save = function() {
		if($scope.interval < 10000) {
			alert("Minimalna wartość to 10000ms");
			init();
			
			return;
		}
		configService.setInboxInterval($scope.interval);
		configService.setSkinVariant($scope.skinVariant);
		$rootScope.$emit("updateSkin", $scope.skinVariant);
	};

	var init = function() {
		$scope.interval = configService.getInboxInterval();
		$scope.skinVariant = configService.getSkinVariant();
	};

	init();
});