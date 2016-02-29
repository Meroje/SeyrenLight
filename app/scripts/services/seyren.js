'use strict';

angular.module('seyrenLightApp')
    .factory('SeyrenService', function (CONFIG, $location, $http) {
        return {
            getChecks: function () {
                var filterParameter;
                if ($location.search().filter) {
                    // Set the value of the view query parameter
                    filterParameter = $location.search().filter;
                }

                // Call Seyren API
                var promise = $http({method: 'GET', url: CONFIG.CI.SEYREN.URL + '/api/checks'}).
                    then(function(response) {

                        // Initialize checks data
                        var data = response.data;
                        var checks = [];

                        data.values.forEach(function(check) {

                            // Check if this `check` can be displayable
                            if (CONFIG.CI.SEYREN.CHECKS_TO_BE_DISPLAYED.indexOf(check.state) > -1) {

                                // Filter checks not displayed
                                if (filterParameter && ! new RegExp(filterParameter, 'gi').test(check.name)) {
                                    return;
                                }

                                check.url = CONFIG.CI.SEYREN.URL + '/#/checks/' + check.id;

                                // Push check on screen
                                checks .push(check);
                            }
                        });

                        // Return checks filtered
                        return checks;
                    });

                // Return the promise to the controller
                return promise;
            }
        };
    });
