'use strict';

var myApp = angular.module('myApp', [
    'chart.js'
])

.controller("myController",['$scope', '$http', function ($scope, $http) {

    $scope.users = [];
    $scope.filterArr = [];

    $scope.cbMod = {
        val1 : false,
        val2 : false,
        val3 : false,
        val4 : false
    };

    $scope.getCurrency = function () {
        var clone = [];
        for (var key in $scope.users) {
            clone = $scope.users[key].exchangeRate;
        }
        $scope.newArr = [];
        for (var i = 0; i < clone.length-1; i++) {
            if (clone[i].currency === 'EUR' || clone[i].currency === 'USD'
                || clone[i].currency === 'GBP' || clone[i].currency ===  'CAD') {
                $scope.newArr.push(clone[i]);
            }
        }

    };

    $scope.selectCur = function (i, j, x, y) {
        if (j === undefined){
            $scope.series = [$scope.newArr[i].currency];
            $scope.data = [
                [$scope.newArr[i].saleRateNB]
            ];
        }
        else if (x === undefined) {
            $scope.series = [$scope.newArr[i].currency, $scope.newArr[j].currency];
            $scope.data = [
                [$scope.newArr[i].saleRateNB],
                [$scope.newArr[j].saleRateNB]
            ];
        }
        else if (y === undefined) {
            $scope.series = [$scope.newArr[i].currency, $scope.newArr[j].currency,
                $scope.newArr[x].currency];
            $scope.data = [
                [$scope.newArr[i].saleRateNB],
                [$scope.newArr[j].saleRateNB],
                [$scope.newArr[x].saleRateNB]
            ];
        }
        else if (y) {
            $scope.series = [$scope.newArr[i].currency, $scope.newArr[j].currency,
                $scope.newArr[x].currency, $scope.newArr[y].currency];
            $scope.data = [
                [$scope.newArr[i].saleRateNB],
                [$scope.newArr[j].saleRateNB],
                [$scope.newArr[x].saleRateNB],
                [$scope.newArr[y].saleRateNB]
            ];
        }
    };

    $scope.selectWeekCur = function (i, j, x, y) {
        if (j === undefined){
            $scope.weekRateC.push($scope.newArr[0].saleRateNB);
            $scope.series = [$scope.newArr[0].currency];
            $scope.data = [
                [$scope.weekRateC[0], $scope.weekRateC[1], $scope.weekRateC[2],
                    $scope.weekRateC[3], $scope.weekRateC[4], $scope.weekRateC[5], $scope.weekRateC[6]]
            ];
        }
        else if (x === undefined) {
            $scope.weekRateC.push($scope.newArr[0].saleRateNB);
            $scope.weekRateG.push($scope.newArr[1].saleRateNB);
            $scope.series = [$scope.newArr[0].currency, $scope.newArr[1].currency];
            $scope.data = [
                [$scope.weekRateC[0], $scope.weekRateC[1], $scope.weekRateC[2],
                    $scope.weekRateC[3], $scope.weekRateC[4], $scope.weekRateC[5], $scope.weekRateC[6]],
                [$scope.weekRateG[0], $scope.weekRateG[1], $scope.weekRateG[2],
                    $scope.weekRateG[3], $scope.weekRateG[4], $scope.weekRateG[5], $scope.weekRateG[6]]
            ];
        }
        else if (y === undefined) {
            $scope.weekRateC.push($scope.newArr[0].saleRateNB);
            $scope.weekRateG.push($scope.newArr[1].saleRateNB);
            $scope.weekRateU.push($scope.newArr[2].saleRateNB);
            $scope.series = [$scope.newArr[0].currency, $scope.newArr[1].currency, $scope.newArr[2].currency];
            $scope.data = [
                [$scope.weekRateC[0], $scope.weekRateC[1], $scope.weekRateC[2],
                    $scope.weekRateC[3], $scope.weekRateC[4], $scope.weekRateC[5], $scope.weekRateC[6]],
                [$scope.weekRateG[0], $scope.weekRateG[1], $scope.weekRateG[2],
                    $scope.weekRateG[3], $scope.weekRateG[4], $scope.weekRateG[5], $scope.weekRateG[6]],
                [$scope.weekRateU[0], $scope.weekRateU[1], $scope.weekRateU[2],
                    $scope.weekRateU[3], $scope.weekRateU[4], $scope.weekRateU[5], $scope.weekRateU[6]]
            ];
        }
        else if (y) {
            $scope.weekRateC.push($scope.newArr[0].saleRateNB);
            $scope.weekRateG.push($scope.newArr[1].saleRateNB);
            $scope.weekRateU.push($scope.newArr[2].saleRateNB);
            $scope.weekRateE.push($scope.newArr[3].saleRateNB);

            $scope.series = [$scope.newArr[0].currency, $scope.newArr[1].currency,
                $scope.newArr[2].currency, $scope.newArr[3].currency];

            $scope.data = [
                [$scope.weekRateC[0], $scope.weekRateC[1], $scope.weekRateC[2],
                    $scope.weekRateC[3], $scope.weekRateC[4], $scope.weekRateC[5], $scope.weekRateC[6]],
                [$scope.weekRateG[0], $scope.weekRateG[1], $scope.weekRateG[2],
                    $scope.weekRateG[3], $scope.weekRateG[4], $scope.weekRateG[5], $scope.weekRateG[6]],
                [$scope.weekRateU[0], $scope.weekRateU[1], $scope.weekRateU[2],
                    $scope.weekRateU[3], $scope.weekRateU[4], $scope.weekRateU[5], $scope.weekRateU[6]],
                [$scope.weekRateE[0], $scope.weekRateE[1], $scope.weekRateE[2],
                    $scope.weekRateE[3], $scope.weekRateE[4], $scope.weekRateE[5], $scope.weekRateE[6]]
            ];
        }
    };

    $scope.getTodayRate = function () {
        $http({
            method: 'GET',
            url: 'https://api.privatbank.ua/p24api/exchange_rates?json&date=21.12.2017'
        }).then(function successCallback(response) {
            $scope.users.push(response.data);
            $scope.getCurrency();

            if ($scope.cbMod.val1 && $scope.cbMod.val2
                && $scope.cbMod.val3 && $scope.cbMod.val4) {
                $scope.selectCur(0, 1, 2, 3);
            }
            else if ($scope.cbMod.val1 === true && $scope.cbMod.val2 === true
                && $scope.cbMod.val3 === true) {
                $scope.selectCur(0, 1, 2);
            }
            else if ($scope.cbMod.vall === true && $scope.cbMod.val2 === true) {
                $scope.selectCur(0, 1);
            }
            else if ($scope.cbMod.val1) {
                $scope.selectCur(0);
            }
            else if ($scope.cbMod.val2) {
                $scope.selectCur(1);
            }
            else if ($scope.cbMod.val3) {
                $scope.selectCur(2);
            }
            else if ($scope.cbMod.val4) {
                $scope.selectCur(3);
            }
            $scope.labels = ["Today"];
        }, function errorCallback(response) {
            console.log('error' + response.statusText);
        });
    };

    $scope.getWeekRate = function () {
        $scope.weekRateC = [];
        $scope.weekRateG = [];
        $scope.weekRateU = [];
        $scope.weekRateE = [];
        $scope.getWeekData = function(y) {
            setTimeout(function(){
                    $scope.urla = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=' + y + '.12.2017';
                    $http({
                        method: 'GET',
                        url: $scope.urla
                    }).then(function successCallback(response) {
                        $scope.users.push(response.data);
                        $scope.getCurrency();
                        if ($scope.cbMod.val1 && $scope.cbMod.val2
                            && $scope.cbMod.val3 && $scope.cbMod.val4) {
                            $scope.selectWeekCur(0, 1, 2, 3);
                        }
                        else if ($scope.cbMod.val1 === true && $scope.cbMod.val2 === true
                            && $scope.cbMod.val3 === true) {
                            $scope.selectWeekCur(0, 1, 2);
                        }
                        else if ($scope.cbMod.val1 === true && $scope.cbMod.val2 === true) {
                            $scope.selectWeekCur(0, 1);
                        }
                        else if ($scope.cbMod.val1) {
                            $scope.selectWeekCur(0);
                        }
                        else if ($scope.cbMod.val2) {
                            $scope.selectWeekCur(1);
                        }
                        else if ($scope.cbMod.val3) {
                            $scope.selectWeekCur(2);
                        }
                        else if ($scope.cbMod.val4) {
                            $scope.selectWeekCur(3);
                        }

                    }, function errorCallback(response) {
                        console.log('error' + response.statusText);
                    });
            }, 2000);
        };
        for (var y = 5; y < 11; y++){
            $scope.getWeekData(y);
        }
        $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    };

    $scope.getMonthRate = function () {

    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['USD', 'UAH'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    /*$scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                },
                {
                    id: 'y-axis-2',
                    type: 'linear',
                    display: true,
                    position: 'right'
                }
            ]
        }
    };*/
}]);

