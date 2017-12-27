'use strict';

var myApp = angular.module('myApp', [
    'chart.js'
])

.controller("myController",['$scope', '$http', function ($scope, $http) {

    $scope.users = [];
    $scope.filterArr = [];

    $scope.checkboxModel = {
        value1 : false,
        value2 : false,
        value3 : false,
        value4 : false
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

    $scope.getTodayRate = function () {
        $http({
            method: 'GET',
            url: 'https://api.privatbank.ua/p24api/exchange_rates?json&date=21.12.2017'
        }).then(function successCallback(response) {
            $scope.users.push(response.data);
            $scope.getCurrency();

            if ($scope.checkboxModel.value1 && $scope.checkboxModel.value2
                && $scope.checkboxModel.value3 && $scope.checkboxModel.value4) {
                $scope.selectCur(0, 1, 2, 3);
            }
            else if ($scope.checkboxModel.value1 === true && $scope.checkboxModel.value2 === true
                && $scope.checkboxModel.value3 === true) {
                $scope.selectCur(0, 1, 2);
            }
            else if ($scope.checkboxModel.value1 === true && $scope.checkboxModel.value2 === true) {
                $scope.selectCur(0, 1);
            }
            else if ($scope.checkboxModel.value1) {
                $scope.selectCur(0);
            }
            else if ($scope.checkboxModel.value2) {
                $scope.selectCur(1);
            }
            else if ($scope.checkboxModel.value3) {
                $scope.selectCur(2);
            }
            else if ($scope.checkboxModel.value4) {
                $scope.selectCur(3);
            }
            $scope.labels = ["Today"];
        }, function errorCallback(response) {
            console.log('error' + response.statusText);
        });
    };

    $scope.getWeekRate = function () {
        $scope.weekRate = [];

            $scope.getData = function () {
                var urla = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=' + $scope.i + '.12.2017';
                $http({
                    method: 'GET',
                    url: urla
                }).then(function successCallback(response) {
                    $scope.users.push(response.data);
                    $scope.getCurrency();
                    $scope.weekRate.push($scope.newArr[0].saleRateNB);
                    console.log($scope.weekRate);
                }, function errorCallback(response) {
                    console.log('error' + response.statusText);
                });
            };
        for ($scope.i = 21; $scope.i < 15; $scope.i++){
            setTimeout($scope.getData, 1000);
        }


        /*$scope.getCurrency();
        $scope.series = [$scope.newArr[0].currency];
        $scope.data = [
            [$scope.weekRate]
        ];*/
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

