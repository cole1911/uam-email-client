angular.module('myApp')

.directive('uamEmailList', function($rootScope, dataService) {
	return {
		scope: {},
		restrict: 'E',
		templateUrl: 'src/app/directives/uam-emails-list/uam-email-list.tpl.html',
		link: function(scope, element) {
			dataService.getEmails().then(function(result) {
				scope.emails = result.data;
				var al = document.querySelector(".ajax-loader");
				al.style.display="none";
				var list = element.find("ul");
				
				for(var key in scope.emails) {
					console.log(scope.emails[key].sender);

					list.append(appendEmailToList(scope.emails[key]));
				}
				
			});
			
			var appendEmailToList = function(email) {
				var listElement = document.createElement("li");
				listElement.id = email.id;
				var sender = document.createElement("span");
				sender.className = "sender";
				sender.innerHTML = email.sender;
				var subject = document.createElement("span");
				subject.className = "subject";
				subject.innerHTML = email.title;
				listElement.appendChild(sender);
				listElement.appendChild(subject);
				return listElement;
			};
		}
	};

});
