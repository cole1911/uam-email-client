angular.module('myApp').

service('labelsService', function(localStorageService) {

	this.getLabels = function() {
		return localStorageService.get("labels") === null ? null : localStorageService.get("labels");
	};

	this.addLabel = function(label) {
		var labels = this.getLabels();
		if(labels) {
			if(labels.indexOf(label) > -1) {
				alert("Label already exist");
				return;
			}
			labels.push(label);
			localStorageService.set("labels",labels);
		} else {
			var temp = [label];
			localStorageService.set("labels",temp);
		}

	};



});