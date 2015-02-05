angular.module('myApp')

.directive('uamEmailList', function($rootScope, dataService) {
	return {
		scope: {
			view: "@view"
		},
		restrict: 'E',
		templateUrl: 'src/app/directives/uam-emails-list/uam-email-list.tpl.html',
		link: function(scope, element) {
			scope.message ="";
			var intervalId = setInterval(function() {
				var al = document.querySelector(".ajax-loader");
				al.style.display="block";
				dataService.getEmails(scope.view).then(function(result) {
					scope.emails = result.data;
					if(scope.emails.length ===0) {
						scope.m = "Brak maili";
						return;
					}
					al.style.display="none";
					var list = element.find("ul");
					list.html('');
					_.sortBy(scope.emails, function(num) {return num;});
					scope.emails.reverse();
					
					for(var key in scope.emails) {
						list.append(appendEmailToList(scope.emails[key]));
					}	
				});
				
				var appendEmailToList = function(email) {
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
					receivedDate.innerHTML = date.getDate() + "-" + date.getMonth()+1 + "-" +
												+ date.getFullYear() + " " + date.getHours() + ":" +
												+ fillMinutes(date.getMinutes());
					listElement.appendChild(addresses);
					listElement.appendChild(subject);
					listElement.appendChild(receivedDate);
					return listElement;
				};
			},10000);
			
			scope.$on('$destroy', function() {
				clearInterval(intervalId);
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
