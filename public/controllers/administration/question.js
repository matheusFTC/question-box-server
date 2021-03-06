"use strict";

var app = angular.module("qbApp");

app.controller("administrationQuestionController", function($scope, $cookies, $routeParams, Group, Question) {

  var token = $cookies.get("token");
  
  $scope.filter;
  $scope.group;
  $scope.questions;
  $scope.question;
  
  Group.findById($routeParams._groupId).then(function(response) {
    $scope.group = response.data;
    
    $scope.findByGroup();
  });
  
  $scope.findByGroup = function() {
    Question.findByGroup($scope.group._id).then(function(response) {
      $scope.questions = response.data;
    });
  };

  $scope.set = function(question) {
    $scope.question = question;
  };

  $scope.new = function() {
    $scope.question = {};

    $scope.question.enunciation = null;
    $scope.question.alternatives = [];
    $scope.question.group = $scope.group._id;
    $scope.question.isActive = true;
  };

  $scope.save = function() {
    Question.save($scope.question, token)
      .then(function(response) {
        $scope.message.success("Question saved successfully!");

        $scope.findByGroup($scope.group);
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };

  $scope.remove = function(question) {
    Question.remove(question._id, token)
      .then(function(response) {
        $scope.message.success("Question removed successfully!");

        $scope.findByGroup($scope.group);
      })
      .catch(function(err) {
        if (err.status === 401) {
          $scope.message.unauthorized();
        } else {
          $scope.message.internalServerError();
        }
      });
  };
});