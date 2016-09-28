(function () {
    'use strict';

    angular
        .module('app.ui')
        .controller('UserInfo', UserInfo);

    function UserInfo(dataservice, logger, $scope, $location) {
        var vm = this;
        vm.title = 'Sign-In';
        $scope.isThankYou = false;

        $(".btn-group > .btn").click(function () {
            $(this).addClass("btn-primaryCustom").removeClass("btn-default").siblings().removeClass("btn-primaryCustom").addClass("btn-default");
        });


        //set the radio buttons
        $scope.gender = 'gender';
        $scope.marriableStatus = 'status';
        $scope.childrenCount = 'children';
        $scope.getGenderVal = function (event)
        {
            console.log($scope.gender);
            console.log(event.currentTarget.value);
            $scope.gender = event.currentTarget.value;
        }

        $scope.getStatusVal = function (event) {
            console.log($scope.marriableStatus);
            console.log(event.currentTarget.value);
            $scope.marriableStatus = event.currentTarget.value;
        }

        $scope.getChildrenVal = function (event) {
            console.log($scope.childrenCount);
            console.log(event.currentTarget.value);
            $scope.childrenCount = event.currentTarget.value;
        }

        $scope.submitForm = function () {

            var userRegistration = new UserRegistration();
            userRegistration.firstName = $scope.firstName;
            userRegistration.lastName = $scope.lastName;
            userRegistration.email = $scope.email;
            userRegistration.phone = $scope.phone;
            userRegistration.gender =  $scope.gender;
            userRegistration.marriageStatus =  $scope.marriableStatus;
            userRegistration.familyCount =  $scope.childrenCount;

            return dataservice.submitUserForm(userRegistration).then(
                function () {
                    $scope.isThankYou = true;
                }).catch(function (err) {
                logger.error('Call to API failed' + err);
            });
        }
        $scope.done = function() {
            $location.path("/HP");
        }
    }

})();


function UserRegistration() {
    var firstName;
    var lastName;
    var email;
    var phone;
    var gender;
    var marriageStatus;
    var familyCount;
}

