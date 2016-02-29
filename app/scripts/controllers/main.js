'use strict';

angular.module('seyrenLightApp')
    .controller('SeyrenLightCtrl', function SeyrenLightCtrl ($scope, $window, CONFIG, SeyrenService, $interval) {
        $scope.checks                  = [];
        $scope.checksPerLine           = 1;
        $scope.backgroundBlankScreen = null;

        var callAPI = function () {
            SeyrenService.getChecks().
                then(function (checks) {

                    // Display background image on blank screen
                    if (CONFIG.BACKGROUND_BLANK_SCREEN_URL) {
                        if (checks.length == 0) {
                            $scope.backgroundBlankScreen = {
                                'background-image': 'url(' + CONFIG.BACKGROUND_BLANK_SCREEN_URL + ')'
                            };
                        } else {
                            $scope.backgroundBlankScreen = null;
                        }
                    }

                    // Calculation of optimized check area
                    var minCheckHeight = 100;
                    var minCheckWidth  = 200;
                    var screenHeigth = $window.innerHeight - 40;
                    var screenWidth  = $window.innerWidth;
                    var sizeSet      = [];
                    var tooLargeSet  = [];
                    var oneCheckWidth, oneCheckHeight, checksPerColumn, checksPerLine;

                    for (var i = 0; i <= CONFIG.MAX_CHECKS_PER_LINE ; i++) {
                        checksPerLine   = i;
                        checksPerColumn = Math.ceil(checks.length / checksPerLine);
                        oneCheckWidth   = Math.ceil(screenWidth / checksPerLine);
                        oneCheckHeight  = Math.ceil(screenHeigth / checksPerColumn);

                        if ((oneCheckHeight < minCheckHeight) && (oneCheckWidth >= minCheckWidth)) {
                            oneCheckHeight = minCheckHeight;
                            tooLargeSet.push({'oneCheckHeight': oneCheckHeight, 'checksPerLine': checksPerLine});
                            continue;
                        } else if (oneCheckWidth < minCheckWidth) {
                            continue;
                        }

                        sizeSet.push({'oneCheckHeight': oneCheckHeight, 'checksPerLine': checksPerLine, 'ratio': oneCheckWidth / oneCheckHeight});
                    }

                    // If at least one solution fit in screen
                    if (sizeSet.length !== 0) {
                        // Searching ratio most closer to 4
                        var baseRatio = 4;
                        sizeSet.sort(function(a, b) {
                            return (Math.abs(a['ratio'] - baseRatio) > Math.abs(b['ratio'] - baseRatio)) ? 1 : -1;
                        });

                        oneCheckHeight = sizeSet[0]['oneCheckHeight'];
                        checksPerLine  = sizeSet[0]['checksPerLine'];
                    } else {
                        var solution = tooLargeSet.pop();
                        oneCheckHeight = solution['oneCheckHeight'];
                        checksPerLine  = solution['checksPerLine'];
                    }

                    var fontSize = Math.floor(15 * (oneCheckHeight / minCheckHeight));

                    $scope.oneCheckHeight = oneCheckHeight;
                    $scope.checksPerLine  = checksPerLine;
                    $scope.fontSize     = fontSize;
                    $scope.checks         = checks;
                });
        };

        callAPI();

        // Begin interval
        $interval(callAPI, CONFIG.REFRESH_TIME);
    });
