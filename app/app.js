'use strict';

var myApp = angular.module('myApp', [
    'chart.js'
])

.controller("myController",['$scope', '$http', function ($scope, $http) {

    $scope.users = [];
    $scope.filterArr = [];

    $scope.getFunc = function () {

        /*var yesterday = new Date();
        yesterday = yesterday.getDate() - 1;
        $scope.url = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=' + yesterday;*/

        $http({
            method: 'GET',
            url: 'https://api.privatbank.ua/p24api/exchange_rates?json&date=5.12.2017'
        }).then(function successCallback(response) {
            $scope.users.push(response.data);

            for (var key in response.data){
                if (key === 'exchangeRate'){
                    $scope.filterArr.push(key);
                }
            }
        }, function errorCallback(response) {
            console.log('error' + response.statusText);
        });
    };

    $scope.getTodayRate = function () {

    };

    $scope.getWeekRate = function () {

    };

    $scope.getMonthRate = function () {

    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['USD', 'UA'];
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

