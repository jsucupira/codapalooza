(function () {
    'use strict';

    angular
        .module('app.fr')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/FR',
                config: {
                    templateUrl: 'App/findResources/fr.html',
                    controller: 'FindResource'
                }
            }
        ];
    }
})();
