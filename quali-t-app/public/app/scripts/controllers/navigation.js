'use strict';

/**
 * @ngdoc function
 * @name qualitApp.controller:NavigationCtrl
 * @description
 * # NavigationCtrl
 * Controller of the qualitApp
 */
angular.module('qualitApp')
  .controller('NavigationCtrl', function ($scope, $state, $location, $rootScope) {
    $scope.ProjectInitiators = "";

    $scope.navigationItems = [
      {
        linkName: 'Home',
        toState: 'dashboard',
        visibleFor: [
          'admin', 'curator', 'synthesizer', 'evaluator', 'projectmanager', 'analyst'
        ]
      },
      {
        linkName: 'Categories',
        toState: 'editCategories',
        visibleFor: [
          'admin', 'curator'
        ]
      },
      {
        linkName: 'Quality Attribute Templates',
        toState: 'showQA',
        visibleFor: [
          'admin', 'curator'
        ]
      },
      {
        linkName: 'Quality Properties',
        toState: 'editQualityProperties',
        visibleFor: [
          'admin', 'analyst'
        ]
      },
      {
        linkName: 'Project Initiators',
        toState: 'projectInitiator',
        visibleFor: [
          'admin', 'analyst', 'projectmanager'
        ]
      },
      {
        linkName: 'Catalogs',
        toState: 'showCatalogs',
        visibleFor: [
          'admin', 'curator'
        ]
      },
      {
        linkName: 'Projects',
        toState: 'showProjects',
        visibleFor: [
          'admin', 'projectmanager', 'analyst', 'synthesizer', 'evaluator'
        ]
      },
      {
        linkName: 'JIRA Connections',
        toState: 'editJIRAConnections',
        visibleFor: [
          'admin', 'projectmanager'
        ]
      },
      {
        linkName: 'Users',
        toState: 'editUsers',
        visibleFor: [
          'admin'
        ]
      },
      {
        linkName: 'Import Catalog',
        toState: 'importCatalog',
        visibleFor: [
          'admin', 'curator'
        ]
      },
      {
        linkName: 'Help',
        toState: 'help',
        visibleFor: [
          'curator', 'synthesizer', 'projectmanager', 'analyst', 'admin', 'evaluator'
        ]
      }
    ];

    $scope.isActive = function (toState) {
      return $state.href(toState).substr(1) === $location.path();
    }


    $scope.isVisible = function (navItem) {
      return navItem.visibleFor.indexOf($rootScope.selectedRole) > -1;
    }


    $scope.popover = {
      title: "Your Profile",
      buttons: [
        {
          title: "Settings",
          clickFunction: function () {
            $state.go("settings");
          },
          icon: "fa fa-cog",
          visibleFor: [
            'admin', 'curator', 'synthesizer', 'evaluator', 'projectmanager', 'analyst'
          ]
        },
        {
          title: "Your Tasks",
          clickFunction: function () {
            $state.go("mytasks");
          },
          icon: "fa fa-tasks",
          visibleFor: [
            'admin', 'curator', 'synthesizer', 'evaluator', 'projectmanager', 'analyst'
          ]
        },
        {
          title: "Logout",
          clickFunction: function () {
            $state.go("logout");
          },
          icon: "fa fa-sign-out",
          visibleFor: [
            'admin', 'curator', 'synthesizer', 'evaluator', 'projectmanager', 'analyst'
          ]
        }
      ]
    };
  });
