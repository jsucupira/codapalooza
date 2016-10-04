﻿(function () {
    'use strict';

    angular
        .module('app.ui')
        .run(appRun);

    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/UserInfo',
                config: {
                    templateUrl: 'app/userinfo/ui.html',
                    controller: 'UserInfo'
                }
            }
        ];
    }
})();
