angular.module('myApp')

.controller('NewEmailCtrl', function($scope, $location, dataService) {

	$scope.send= function() {
		var email = new SentEmail();
		var date = new Date();
		email.id = date.getTime();
		email.content = $scope.content;
		email.title = $scope.title;
		email.sent = email.id;
		var receiversArray = $scope.receivers.split(";");
		email.receivers = receiversArray;
		dataService.sendEmail(email).then(function(result) {
			console.log(result.data);
			console.log("email sent");
			$location.path("sent");
		});
	};

	$scope.initForm = function() {
		$scope.id = 0;
		$scope.title = "";
		$scope.receivers = "";
		$scope.content = "";
		$scope.sent = 0;
        $scope.m = "Create new email";
	};
	
	$scope.initForm();
	
});