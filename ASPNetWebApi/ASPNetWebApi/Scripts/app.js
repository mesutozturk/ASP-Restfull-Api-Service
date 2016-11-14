/// <reference path="angular.js" />
var app = angular.module("north", []);


app.factory("api", function ($http) {
    var apiUrl = 'http://localhost:2185/api/';
    return {
        getAllCategories: function (success) {
            $http({
                url: apiUrl + 'Category',
                method: 'GET',
                dataType: 'JSON'
            }).success(function (response) {
                success(response);
            })
        },
        getCategoryById: function (id, success) {
            $http({
                url: apiUrl + 'Category/' + id,
                method: 'GET',
                dataType: 'JSON'
            }).success(function (response) {
                success(response);
            })
        }
    }
})

app.controller("CategoryCtrl", function ($scope, api) {
    $scope.categories = [];
    $scope.category = {};
    api.getAllCategories(function (response) {
        $scope.categories = response;
    })
    $scope.detayGoster = function (id) {
        api.getCategoryById(id, function (response) {
            $scope.category = response;
        })
    }
})