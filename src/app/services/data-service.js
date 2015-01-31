angular.module('myApp').

service('dataService', function($http) {
	this.getEmails = function() {
		return $http({
			method: 'GET',
			cache: false,
			url: '/emails'
		});
    };
});