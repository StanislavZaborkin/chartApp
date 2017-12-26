'use strict';

var myApp = angular.module('myApp', [
    'chart.js'
])

.controller("myController",['$scope', '$http', function ($scope, $http) {

    $scope.users = [];
    $scope.filterArr = [];

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
        console.log($scope.newArr[1].saleRateNB);
    };

    $scope.selectCur = function (val) {

    }

    $scope.getTodayRate = function (selCur) {
        var today = new Date();
        var urla = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=' + (today.getDate()-5) + '.' +
            (today.getMonth() + 1) + '.' + today.getFullYear();

        $http({
            method: 'GET',
            url: urla
        }).then(function successCallback(response) {
            $scope.users.push(response.data);
            $scope.getCurrency();
            $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            $scope.series = [$scope.newArr[1].currency];
            $scope.data = [
                [$scope.newArr[1].saleRateNB]
            ];
        }, function errorCallback(response) {
            console.log('error' + response.statusText);
        });
    };

    $scope.getWeekRate = function () {
        var today = new Date();
        var urla = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=' + (today.getDate()-5) + '.' +
            (today.getMonth() + 1) + '.' + today.getFullYear();

        $http({
            method: 'GET',
            url: urla
        }).then(function successCallback(response) {
            $scope.users.push(response.data);
            $scope.getCurrency();
            $scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

            $scope.series = [$scope.newArr[1].currency];
            $scope.data = [
                [$scope.newArr[1].saleRateNB]
            ];
        }, function errorCallback(response) {
            console.log('error' + response.statusText);
        });
    };

    $scope.getMonthRate = function () {

    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['USD', 'UAH'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
    $scope.onClick = function (points, evt) {
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
    };
}]);

