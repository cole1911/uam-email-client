angular.module('myApp')

        .controller('ViewEmailCtrl', function ($scope, $state, dataService, labelsService) {

            $scope.m = "View of amil";
            $mail = null;
            $sent = false;
            $id = $state.params.id;
            $scope.id = $id;
            $scope.labelsOptions = [];
            $scope.selectedLabel="";
            
            var init = function() {
                $scope.labels = labelsService.getLabels();
                if($scope.labels) {
                    var tempArray = [];
                    for(var key in $scope.labels) {
                        var tempObj={};
                        tempObj.key = $scope.labels[key];
                        tempObj.value = $scope.labels[key];
                        $scope.labelsOptions.push(tempObj);
                    }
                }
            };

            init();

            $scope.saveLabel = function() {
                if($scope.selectedLabel !== "") {
                    if($scope.emailLabels.indexOf($scope.selectedLabel) !== -1) {
                        alert("Label already in use");
                        return;
                    }
                    $scope.emailLabels.push($scope.selectedLabel);
                    var obj = {"labels":$scope.emailLabels};
                    dataService.updateEmail($scope.id,obj).then(function(result) {
                        console.log("label saved");
                    });
                }   
            };

            dataService.getEmails('inbox').then(function (result) {
                result.data.forEach(function (entry) {
                    if ($id === entry.id) {
                        $mail = entry;
                    }
                });

                dataService.getEmails().then(function (result) {
                    //console.dir(result.data);
                    result.data.forEach(function (entry) {
                        if (Number($id) === entry.id) {
                            $mail = entry;
                            $sent = true;
                        }
                    });


                    if ($mail === null) {
                        $scope.mtitle = 'Mail is missing';
                        $scope.msender = '';
                        $scope.mcontent = '';
                    } else {
                        $scope.mtitle = $mail.title;
                        $scope.mcontent = $mail.content;
                        if($mail.labels) {
                            $scope.emailLabels = $mail.labels;
                        } else {
                            $scope.emailLabels = [];
                        }

                        if ($sent === true) {
                            $scope.msender = '';
                            $mail.receivers.forEach(function (entry) {
                                $scope.msender += entry + ' ';
                            });
                        } else {
                            $scope.msender = $mail.sender;
                        }
                    }


                });

            });



        });