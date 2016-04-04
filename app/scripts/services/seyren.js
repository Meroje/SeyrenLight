'use strict';

angular.module('seyrenLightApp')
    .factory('SeyrenService', function (CONFIG, $location, $http) {
        return {
            getChecks: function () {
                var params = {
                    state: CONFIG.CI.SEYREN.CHECKS_TO_BE_DISPLAYED,
                    enabled: true,
                };
                var filterParameter;
                if ($location.search().filter) {
                    // Set the value of the view query parameter
                    filterParameter = $location.search().filter;
                }

                // Call Seyren API
                // see https://github.com/scobal/seyren/blob/master/API.md#search-checks
                var promise = $http({method: 'GET', url: CONFIG.CI.SEYREN.URL + '/api/checks', params: params}).
                    then(function(response) {

                        // Initialize checks data
                        var data = response.data;
                        var checks = [];

                        data.values.forEach(function(check) {

                            // Filter checks not displayed, since API regexes seems to fail...
                            if (filterParameter && ! new RegExp(filterParameter, 'gi').test(check.name)) {
                                return;
                            }

                            check.url = CONFIG.CI.SEYREN.URL + '/#/checks/' + check.id;

                            // Push check on screen
                            checks .push(check);
                        });

                        // Return checks filtered
                        return checks;
                    });

                // Return the promise to the controller
                return promise;
            }
        };
    });
