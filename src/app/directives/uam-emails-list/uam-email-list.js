angular.module('myApp')

.directive('uamEmailList', function($rootScope, $location, dataService) {
	return {
		scope: {
			view: "@view"
		},
		restrict: 'E',
		templateUrl: 'src/app/directives/uam-emails-list/uam-email-list.tpl.html',
		link: function(scope, element) {
			scope.message = "";
			scope.dataLoading = true;
			var list = element.find("ul");
			element.bind('click', function(event) {
				var clickedEl = event.target;
				while(clickedEl !== undefined && clickedEl.tagName !== 'LI') {
					clickedEl = clickedEl.parentElement;
				}
				if(clickedEl.tagName === 'LI') {
					$location.path("view/" + clickedEl.id);
					scope.$apply();
				}
			});

			var intervalId = setInterval(function() {
				scope.dataLoading = true; 	
				dataService.getEmails(scope.view).then(function(result) {
					if(scope.emails === undefined) {
						scope.emails = result.data;
						if(scope.emails.length === 0) {
							scope.m = "Brak maili";
							return;
						}
						
						
						//list.html('');
						_.sortBy(scope.emails, function(num) {return num;});

						scope.emails.reverse();
						
						for(var key in scope.emails) {
							list.append(prepareEmailToList(scope.emails[key]));
						}
						scope.dataLoading = false; 	
					} else {
						scope.lastDate = scope.emails[0].received;
						appendNewEmails(scope.emails, result.data, scope.lastDate);
						scope.dataLoading = false;
					}
					

				});

				var appendNewEmails = function(oldList, newList, date) {
					var i = newList.length-1;
					if(i>0) {
						while(newList[i].received > date & i>0) {
							oldList.unshift(newList[i]);
							
							list.insertBefore(prepareEmailToList(newList[i]),list.firstChild);
							console.log('Email added to list');
							i--;
						}
					}
				};
				
				var prepareEmailToList = function(email) {
					var listElement = document.createElement("li");
					listElement.id = email.id;
					var addresses = document.createElement("span");
					if(scope.view === "inbox") {
						addresses.className = "sender";
						addresses.innerHTML = email.sender;
					} else if(scope.view === "sent") {
						for(var key in email.receivers) {
							addresses.className = "receiver";
							addresses.innerHTML = addresses.innerHTML + email.receivers[key] + " ";
						}
					}
					
					var subject = document.createElement("span");
					subject.className = "subject";
					subject.innerHTML = email.title;
					var receivedDate = document.createElement("span");
					var tempDate = email.received ? email.received : email.sent;
					var date = new Date(tempDate);
					receivedDate.className = "date";
					receivedDate.innerHTML = date.getDate() + "-" + (date.getMonth()+1) + "-" +
												+ date.getFullYear() + " " + date.getHours() + ":" +
												+ (date.getMinutes() > 9 ? date.getMinutes() : 0 + date.getMinutes());
					listElement.appendChild(addresses);
					listElement.appendChild(subject);
					listElement.appendChild(receivedDate);
					if(!email.read) {
						listElement.className = "unread";
					}
					return listElement;
				};
			},10000);
			
			scope.$on('$destroy', function() {
				if(intervalId) {
					clearInterval(intervalId);
				}
			});
			
			var fillMinutes = function(minutes) {
				if(minutes>=10) {
					return minutes.toString();
				} else {
					minutes = "0"+minutes;
					return minutes;
				}
			};

		}
	};

});
