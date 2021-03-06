'use strict';

/**
 * @ngdoc function
 * @name qualitApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the qualitApp
 */
angular.module('qualitApp')
  .controller('CategoryCtrl', function ($scope, apiService, $modal, alertService) {
    $scope.errors = new Array();
    $scope.success = new Array();


    $scope.openModalView = function (type, clickedCat) {
      var parentId = ($(clickedCat).data('id') == "" ? null : $(clickedCat).data('id'));
      var name = $(clickedCat).data('name');

      // create new isolated scope for modal view
      var modalScope = $scope.$new(true);
      modalScope.type = type;
      modalScope.category = {
        name: name,
        parentId: parentId
      }
      modalScope.updateSubCategory = $scope.updateSubCategory;
      modalScope.createSubCategory = $scope.createSubCategory;

      var modal = $modal({
        scope: modalScope,
        template: "templates/category-modal.tpl.html"
      });
    }

    $scope.add = function (clickedCat) {
      $scope.openModalView("add", clickedCat);
    }

    $scope.delete = function (clickedCat) {
      var deletePromise = apiService.deleteCategory($(clickedCat).attr("data-id"));
      deletePromise.then(function (payload) {
        alertService.createSuccess("Category successfully deleted");
        $scope.loadCategories();
      });
    }

    $scope.edit = function (clickedCat) {
      $scope.openModalView("edit", clickedCat);
    }

    $scope.updateSubCategory = function (name, icon, id) {
      var updatePromise = apiService.updateSubCategory(name, icon, id);
      updatePromise.then(function (payload) {
        alertService.createSuccess("Category successfully updated");
        $scope.loadCategories();
      });

    }

    $scope.createSubCategory = function (name, icon, parent) {
      var createPromise = apiService.createSubCategory(name, icon, parent);
      createPromise.then(function (payload) {
        alertService.createSuccess("Category successfully created");
        $scope.loadCategories();
      });
    }

    $scope.createSuperCat = function (name, icon) {
      // simulate a clicked element
      var clickedElement = $("<div/>", {
        'data-id': '',
        'data-name': '',
        'data-icon': ''
      });

      $scope.add(clickedElement);
    }

    $scope.loadCategories = function () {
      var categoriesPromise = apiService.getCategories();
      categoriesPromise.then(function (payload) {
        $scope.catList = payload.data;
      })
    }

    $scope.init = function () {
      $scope.loadCategories();
    }
  })
;
