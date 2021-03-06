"use strict";

var app = angular.module("qbApp");

app.controller("administrationUserController", function($scope, $cookies, User) {

  var token = $cookies.get("token");
  
  $scope.filter;
  $scope.users;
  $scope.user;
  
  $scope.findAll = function() {
    User.findAll(token).then(function(response) {
      $scope.users = response.data;
    });
  };
  
  $scope.set = function(user) {
    $scope.user = user;
  };

  $scope.new = function() {
    $scope.user = {};

    $scope.user.username = null;
    $scope.user.password = null;
    $scope.user.fullname = null;
  };
  
  $scope.save = function() {
    User.save($scope.user, token)
      .then(function(response) {
        $scope.message.success("User saved successfully!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.remove = function(user) {
    User.remove(user._id, token)
      .then(function(response) {
        $scope.message.success("User removed successfully!");

        $scope.findAll();
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };
  
  $scope.findAll();
});