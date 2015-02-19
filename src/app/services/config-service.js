angular.module('myApp').

service('configService', function(localStorageService) {

	var DEFAULT_INTERVAL=10000;
	var DEFAULT_SKIN='default';

	this.getInboxInterval = function() {
		if(localStorageService.get("inboxInterval") !== null) {
			return localStorageService.get("inboxInterval");
		} else {
			return DEFAULT_INTERVAL;
		}
	};

	this.setInboxInterval = function(interval) {
		localStorageService.set("inboxInterval",parseInt(interval,10));
	};

	this.getSkinVariant = function() {
		if(localStorageService.get("skin") !== null) {
			return localStorageService.get("skin");
		} else {
			return DEFAULT_SKIN;
		}
	};

	this.setSkinVariant = function(skin) {
		localStorageService.set("skin",skin);
	};

});