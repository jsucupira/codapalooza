(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', shell);

    /* @ngInject */
    function shell(config, logger, $location, $scope) {
    //    alert("hello shell");
      //  $location.path('/HP');
        $scope.Redirect = function () {
            $location.path('/HP');
        }

        $scope.gotoFR = function () {
            $location.path("/FR");
        }

        $scope.gotoUrgent = function () {
            $location.path("/Urgent");
        }

        $location.path('/HP');
    }
})();
