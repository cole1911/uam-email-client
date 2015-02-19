angular.module('myApp').

service('dataService', function($http) {
	this.getEmails = function(view) {
		var url = view==="inbox" ? "/emails" : "/sent";
		return $http({
			method: 'GET',
			cache: false,
			url: url
		});
    };

    this.sendEmail = function(data) {
    	return $http({
			method: 'POST',
			url: "/sent",
			data: data
		});
    };

    this.updateEmail = function(id,data) {
    	return $http({
			method: 'PUT',
			url: "/emails/" + id,
			data: data
		});
    };
    
    this.deleteEmail = function(id) {
    	return $http({
			method: 'DELETE',
			url: "/emails/" + id
		});
    };

});