angular.module('myApp')

        .controller('ViewEmailCtrl', function ($scope, $state, dataService) {

            $scope.m = "View of amil";
            $mail = null;
            $sent = false;
            $id = $state.params['id'];
            $scope.id = $id;
            // check inbox
            dataService.getEmails('inbox').then(function (result) {
                result.data.forEach(function (entry) {
                    if ($id === entry['id']) {
                        $mail = entry;
                    }
                });

                dataService.getEmails().then(function (result) {
                    console.dir(result.data);
                    result.data.forEach(function (entry) {
                        if (Number($id) === entry['id']) {
                            $mail = entry;
                            $sent = true;
                        }
                    });


                    if ($mail === null) {
                        $scope.mtitle = 'Mail is missing';
                        $scope.msender = '';
                        $scope.mcontent = '';
                    } else {
                        $scope.mtitle = $mail['title'];
                        $scope.mcontent = $mail['content'];
                        if ($sent === true) {
                            $scope.msender = '';
                            $mail['receivers'].forEach(function (entry) {
                                $scope.msender += entry + ' ';
                            });
                        } else {
                            $scope.msender = $mail['sender'];
                        }
                    }


                });

            });



        });