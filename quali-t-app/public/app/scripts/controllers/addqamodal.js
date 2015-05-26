'use strict';

/**
 * @ngdoc function
 * @name qualitApp.controller:AddQaModalCtrl
 * @description
 * # AddQaModalCtrl
 * Controller of the qualitApp
 */
angular.module('qualitApp')
  .controller('AddQaModalCtrl', function ($scope, apiService, $stateParams, alerts) {
    $scope.isChooseMode = true;
    $scope.catalogQas = new Array();
    $scope.catList = new Array();
    $scope.selection = new Array();
    $scope.currentCategoriesFilter = new Array();

    $scope.tooltipsAddMode = "You can choose from existing Quality Attribute Tempaltes " +
    "or create a new Quality Attribute Template (will be automatically added to standard catalog).";

    $scope.add = function () {
      if ($scope.isChooseMode) {
        _.forEach($scope.selection, function (n) {
          var promise = apiService.addCatalogQa($stateParams.catalogId, n.qa.id, n.id, n.variables);
          promise.then(function(payload) {
            alerts.createSuccess("CatalogQa added to Catalog");
          });
        });
      } else {

      }
    }

    $scope.filterByCategories = function (catalogQa) {
      // if there is a filter set
      if ($scope.currentCategoriesFilter.length > 0) {
        var categoryIds = $scope.categoryIdsOfQa(catalogQa.qa);
        var fullfiesFilter = false;
        for (var i = 0; i < $scope.currentCategoriesFilter.length; i++) {
          var categoryFilter = $scope.currentCategoriesFilter[i];

          for (var j = 0; j < categoryIds.length && !fullfiesFilter; j++) {
            if (categoryFilter == categoryIds[j]) {
              fullfiesFilter = true;
            }
          }
        }
        return fullfiesFilter;
      } else {
        return true;
      }
    }

    $scope.categoryIdsOfQa = function (qa) {
      var ids = new Array();
      for (var i = 0; i < qa.categories.length; i++) {
        ids.push(qa.categories[i].id);
      }
      return ids;
    }


    $scope.filter = function (clickedElement, isRoot) {
      $scope.currentCategoriesFilter = new Array();
      var checkbox = $(clickedElement).find("input[type='checkbox']");

      // check for subcategories
      var children;
      if (isRoot) {
        children = $(clickedElement).parent().parent().parent().parent().find("input[type='checkbox']");
      } else {
        children = $(clickedElement).parent().parent().find("input[type='checkbox']");
      }

      if (checkbox.prop('checked')) {

        // check for subcategories
        $(children).each(function (index, val) {
          // first child is the clicked one, ignore this one
          if (index != 0) {
            $(this).prop('checked', 'checked');
          }
        })

      } else {
        $(children).each(function (index, val) {
          // first child is the clicked one, ignore this one
          if (index != 0) {
            $(this).prop('checked', '');
          }
        });
      }

      $("#filter input[type='checkbox']:checked").each(function () {
        $scope.currentCategoriesFilter.push($(this).data('id'));
      });

      $scope.$apply();
    }


    $scope.toggleSelection = function (qa) {
      var indexInArr = $scope.selection.indexOf(qa);
      if (indexInArr > -1) {
        $scope.selection.splice(indexInArr, 1);
      } else {
        $scope.selection.push(qa);
      }
    }


    $scope.init = function (hideFunction) {
      var initPromise = apiService.getCategories();
      initPromise.then(function (payload) {
        $scope.catList = payload.data;
        return apiService.getStandardCatalogQas();
      }).then(function (payload) {
        $scope.catalogQas = payload.data;
      });

      $scope.hideModal = hideFunction;
    }
  });