(function () {
    'use strict';

    angular
        .module('app.core')
        .service('dataservice', dataservice);

    function dataservice($http, $q, exception, logger) {
        var readyPromise;
        var ds = this;
        ds.ready = ready;
        ds.getEarnings = getEarnings;
        ds.getProviders = getProviders;
        ds.submitUserForm = submitUserForm;

        //var baseUrl = "http://localhost:51319/";

        var appUrl = 'http://tampainnovationwebservices.azurewebsites.net/';
        //var appUrl = 'http://localhost:51319/';

        function getEarnings() {
            return $http.get(baseUrl + 'api/Values/Get',
                {
                    params: {
                        id: 3
                    }
                })
                .then(function(response) {
                    return response.data;
                })
                .catch(function(message) {
                    exception.catcher('XHR Failed for GetDetails')(message.data.ExceptionMessage);
                });
        }

        function submitUserForm(userInfo) {
            return $http.post(appUrl + "users", userInfo)
                .then(function (response) {
                    return response.data;
                })
                .catch(function (message) {
                    exception.catcher('XHR Failed for GetDetails')(message.data.ExceptionMessage);
                });
        }

        function shapeResourceData(data, userSelection)
        {
         console.log(userSelection);
         var shapedData =   [{ resourceIndex: 'CLOT', resourceName: 'Clothing', details: [] },
                              { resourceIndex: 'FOOD', resourceName: 'Food', details: [] },
                              { resourceIndex: 'SHEL', resourceName: 'Shelter', details: [] },
                              { resourceIndex: 'DOMV', resourceName: 'Domestic Violence', details: [] },
                              { resourceIndex: 'HYGP', resourceName: 'Hygiene Products', details: [] },
                              { resourceIndex: 'MEDI', resourceName: 'Medical', details: [] }];

          function getIndex(resource)
          {
               for (var idx = 0; idx < shapedData.length; idx++) {
                   if (shapedData[idx].resourceName === resource.name ) 
                   {
                       // if (resoucesSelected[idx].toUpperCase() === resource.name.toUpperCase())
                           return idx;
                   }
               }
               return -1;
           }
  
           function getPhysical(addrDtl) {
               for (var idx = 0; idx < addrDtl.providers.addresses.length; idx++) {
                   if (addrDtl.providers.addresses[idx].addressType === 'Physical') {
                       return {
                           streetAddress: addrDtl.providers.addresses[idx].streetAddress, city: addrDtl.providers.addresses[idx].city, state: addrDtl.providers.addresses[idx].state,
                           zipCode: addrDtl.providers.addresses[idx].zipCode, country: addrDtl.providers.addresses[idx].country, landmarks: addrDtl.providers.addresses[idx].landmarks,
                           latitude: addrDtl.providers.addresses[idx].latitude, longitude: addrDtl.providers.addresses[idx].longitude
                       };
                   }
               }

               return {};
           }

           function getPhone(phoneDtl) {
               for (var idx = 0; idx < phoneDtl.providers.contactInformations.length; idx++) {
                   if (phoneDtl.providers.contactInformations[idx].name.substring(0, 4) === 'Main') {
                       return phoneDtl.providers.contactInformations[idx].number;
                   };
                }

               return null;
           }


            for (var providerIdx = 0; providerIdx < data.length; providerIdx++) {
                var dt = data[providerIdx];

                for (var resourceIdx = 0; resourceIdx < dt.providers.providedServices.length; resourceIdx++) {
                    var idxShape = getIndex(dt.providers.providedServices[resourceIdx]);
                    if (idxShape<0)
                        continue;;

                    var addr = getPhysical(dt);
                    shapedData[idxShape].details.push({
                        distance: dt.distance,
                        providerName: dt.providers.name,
                        streetAddress: addr.streetAddress,
                        city: addr.city,
                        state: addr.state,
                        zipCode: addr.zipCode,
                        country: addr.country,
                        landmarks: addr.landmarks,
                        latitude: addr.latitude,
                        longitude: addr.longitude,
                        operationHours: dt.providers.operationHours,
                        totalUnits: dt.providers.totalUnits,
                        phoneNumber: getPhone(dt)
                    });
                }

            }

            return shapedData;
        }


        function getProviders(requestObj, userSelection) {
          
            return $http.post(appUrl + "providers",
                    requestObj
                )
                .then(function(response) {
                    //   alert("getProviders");
                    return shapeResourceData(response.data, userSelection);
                })
                .catch(function (message) {
                    //XHR Failed for GetDetails....Message is show for users to easily understand the issue.
                    exception.catcher('Unable to get the list for providers due to system issue. Please try after sometime or call 211 for urgent help.')(message.data.ExceptionMessage);
                });
        }

        function getReady() {
            if (!readyPromise) {

                readyPromise = $q.when(ds);
            }
            return readyPromise;
        }

        function ready(promisesArray) {
            return getReady()
                .then(function () {
                    return promisesArray ? $q.all(promisesArray) : readyPromise;
                })
                .catch(exception.catcher('"ready" function failed'));
        }
    }
})();
