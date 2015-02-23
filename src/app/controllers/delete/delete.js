angular.module('myApp')

.controller('DelEmailCtrl', function($scope, $state, $location, dataService) {

	$scope.m = "Deleting email...";
        $id = $state.params.id;

        dataService.deleteEmail($id).then(function() {
            $location.path("inbox");
        });
});