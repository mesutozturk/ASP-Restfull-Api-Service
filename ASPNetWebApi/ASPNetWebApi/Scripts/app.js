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
        },
        addCategory: function (newCategory, success) {
            $http({
                url: apiUrl + 'Category',
                method: 'POST',
                dataType: 'JSON',
                data: JSON.stringify(newCategory),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).success(function (response) {
                success(response);
            })
        },
        updateCategory: function (category, success) {
            $http({
                url: apiUrl + 'Category',
                method: 'PUT',
                dataType: 'JSON',
                data: JSON.stringify(category),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).success(function (response) {
                success(response);
            })
        },
        deleteCategory: function (id, success) {
            $http({
                url: apiUrl + 'Category/'+id,
                method: 'DELETE',
                dataType: 'JSON',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
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
    $scope.ekle = function () {
        var model = {
            CategoryName: $scope.category.CategoryName,
            Description: $scope.category.Description
        };
        api.addCategory(model, function (response) {
            console.log(response.message);
            if (response.success) {
                api.getAllCategories(function (response) {
                    $scope.categories = response;
                })
            }
        })
    }
    $scope.guncelle = function () {
        var model = {
            CategoryID: $scope.category.CategoryID,
            CategoryName: $scope.category.CategoryName,
            Description: $scope.category.Description
        };
        api.updateCategory(model, function (response) {
            console.log(response.message);
            if (response.success) {
                api.getAllCategories(function (response) {
                    $scope.categories = response;
                })
            }
        })
    }
    $scope.sil = function () {
        var id = $scope.category.CategoryID;
        if (id != undefined) {
            api.deleteCategory(id,function (response) { 
                console.log(response)
                api.getAllCategories(function (response) {
                    $scope.categories = response;
                })
            })
        }
    }
})