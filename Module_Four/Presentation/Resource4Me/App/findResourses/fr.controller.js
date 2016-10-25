(function () {
    'use strict';

    angular
        .module('app.fr')
        .controller('FindResource', FindResource);

    function FindResource(dataservice, logger, $scope, $location) {
        $scope.myValue = true;
        $(".btn-group > .btn").click(function () {
            $(this).addClass("btn-primaryCustom").removeClass("btn-default").siblings().removeClass("btn-primaryCustom").addClass("btn-default");
        });
        $scope.clothing = "";
        $scope.food = "";
        $scope.shelter = "";
        $scope.domVol = "";
        $scope.hygProducts = "";
        $scope.medical = "";
        var btnsearch = $("#btnSearch");


        $scope.getClothingrVal = function (event) {
            console.log($scope.clothing);
            console.log(event.currentTarget.value);
            $scope.clothing = event.currentTarget.value;
            showSearchbtn();
        }
        $scope.getfoodVal = function (event) {
            console.log($scope.food);
            console.log(event.currentTarget.value);
            $scope.food = event.currentTarget.value;
            showSearchbtn();
        }
        $scope.getshelterVal = function (event) {
            console.log($scope.shelter);
            console.log(event.currentTarget.value);
            $scope.shelter = event.currentTarget.value;
            showSearchbtn();
        }
        $scope.getdomVolVal = function (event) {
            console.log($scope.domVol);
            console.log(event.currentTarget.value);
            $scope.domVol = event.currentTarget.value;
            showSearchbtn();
        }
        $scope.gethygProductsVal = function (event) {
            console.log($scope.hygProducts);
            console.log(event.currentTarget.value);
            $scope.hygProducts = event.currentTarget.value;
            showSearchbtn();
        }
        $scope.getmedicalVal = function (event) {
            console.log($scope.medical);
            console.log(event.currentTarget.value);
            $scope.medical = event.currentTarget.value;
            showSearchbtn();
        }

        // enable search button only if there is a resouce selected. 
        function showSearchbtn()
        {
                if( $scope.clothing === "" &&  $scope.food === "" && $scope.shelter === "" && $scope.domVol === "" && $scope.hygProducts === "" && $scope.medical === "")
            {
                btnsearch.addClass('hide');
                }
            else {
                btnsearch.removeClass('hide');
                }
        }
      //  getDataFromAPI();
      
        function getDataFromAPI()  {
            return dataservice.getEarnings().then(function (response) {
                $scope.Data = response;
            }).catch(function (err) {
                logger.error('Call to API failed' + err);
            });
        }

        $scope.Update = function () {
            $scope.myValue = false;
            $scope.dataLoaded = false;
            navigator.geolocation.getCurrentPosition(success, error);
           
            var userSelection = [ $scope.clothing,
                                  $scope.food,
                                  $scope.shelter,
                                  $scope.domVol,
                                  $scope.hygProducts,
                                  $scope.medical
                                ];


            var requestObj = new Object();
            requestObj.filters = userSelection;
            requestObj.query = '28.053397' + ',' + '-82.4473383';
            requestObj.range = 25;
            requestObj.limit = 200;
            return dataservice.getProviders(requestObj, userSelection).then(function (response) {
                $scope.myData = response;
                $scope.dataLoaded = true;
            }).catch(function (err) {
                logger.error('Call to API failed' + err);
            });
        };

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var locat = latitude + "," + longitude;
        };

        function error(position) {
            var latitude = '28.053397';
            var longitude = '-82.4473383';

            var locat = latitude + "," + longitude;
        };
    }
})();




