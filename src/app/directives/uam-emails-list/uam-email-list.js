angular.module('myApp')

.directive('uamEmailList', function($rootScope, $location, dataService, configService) {
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
			var interval = configService.getInboxInterval();

			element.bind('click', function(event) {
				var clickedEl = event.target;
				while (clickedEl !== undefined && clickedEl.tagName !== 'LI' && clickedEl.tagName !== 'BUTTON') {
					clickedEl = clickedEl.parentElement;
				}
				if(clickedEl.tagName === 'LI') {
					if(scope.view !== "sent" && clickedEl.className.indexOf("unread") !=-1) {
						var obj = {id:clickedEl.id,read:true};
						dataService.updateEmail(clickedEl.id,obj).then(function(result) {
							$location.path("view/" + clickedEl.id);
							//scope.$apply();
						});
					} else {
						$location.path("view/" + clickedEl.id);
						//scope.$apply();
					}

				}
                                if(clickedEl.tagName === 'BUTTON') {
                                    $location.path("del/" + clickedEl.id);
                                }
                        });

			var intervalId = setInterval(function() {
				scope.dataLoading = true; 	
				dataService.getEmails(scope.view).then(function(result) {
					if(scope.emails === undefined) {
						scope.emails = result.data;
						if(scope.emails.length === 0) {
							scope.m = "No emails";
							return;
						}
						
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
							
							list[0].insertBefore(prepareEmailToList(newList[i]),list[0].firstChild);
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
                                        var prevcontent = document.createElement("span");
					prevcontent.className = "prevcontent";
					prevcontent.innerHTML = email.content.substring(0,60) + '...';                                        
					var receivedDate = document.createElement("span");
					var tempDate = email.received ? email.received : email.sent;
					var date = new Date(tempDate);
					receivedDate.className = "date";
					receivedDate.innerHTML = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + (date.getMinutes() > 9 ? date.getMinutes() : 0 + date.getMinutes());
					                                        
					var deleteButton = document.createElement("button");
					deleteButton.id = (email.id * 100);
                                        deleteButton.className = "delete";
					deleteButton.innerHTML = 'X';
                                    
                                        listElement.appendChild(addresses);
					listElement.appendChild(subject);
                                        listElement.appendChild(prevcontent);
					listElement.appendChild(receivedDate);
                                        listElement.appendChild(deleteButton);
                                        
                                        
					if(!email.read) {
						listElement.className = "unread";
					}
                    listElement.className += " list-group-item";
					return listElement;
				};
			},interval);
			
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
