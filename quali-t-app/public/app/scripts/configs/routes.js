angular.module('qualitApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
      .state('welcome', {
        templateUrl: 'views/home/welcome.html',
        url: '/welcome',
        controller: 'HomeCtrl'
      })
      .state('about', {
        templateUrl: 'views/home/about.html',
        url: '/about',
        controller: 'HomeCtrl'
      })
      .state('login', {
        templateUrl: 'views/auth/login.html',
        url: '/login',
        controller: 'AuthCtrl'
      })
      .state('register', {
        templateUrl: 'views/auth/register.html',
        url: '/register',
        controller: 'AuthCtrl'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthCtrl',
        onEnter: function ($rootScope) {
          $rootScope.logout();
        }
      })
      .state('successfulLogout', {
        url: '/logout',
        templateUrl: 'views/auth/logoutSuccessful.html'
      })
      .state('settings', {
        url: '/authenticated/profile/settings',
        controller: 'SettingsCtrl',
        templateUrl: 'views/profile/settings.html'
      })
      .state('mytasks', {
        url: '/authenticated/profile/mytasks',
        controller: 'MytasksCtrl',
        templateUrl: 'views/profile/mytasks.html'
      })
      .state('accessdenied', {
        templateUrl: 'views/errors/access_denied.html',
        url: '/authenticated/accessdenied'
      })
      .state('dashboard', {
        url: '/authenticated/dashboard',
        controller: 'DashboardCtrl',
        templateUrl: 'views/dashboard.html',
        data: {
          roles: ['analyst', 'projectmanager', 'synthesizer', 'evalutaor', 'admin']
        }
      })
      .state('projectInitiator', {
        templateUrl: 'views/projectInitiator/admin.html',
        url: '/authenticated/projectInitiator/admin',
        controller: 'ProjectInitiatorCtrl',
        data: {
          roles: ['projectmanager', 'admin']
        }

      })
      .state('newQA', {
        templateUrl: 'views/qa/createEdit.html',
        url: '/authenticated/qa/create/:catalogId',
        controller: 'QACtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('editQA', {
        templateUrl: 'views/qa/createEdit.html',
        url: '/authenticated/qa/edit/:catalogQa/:catalogId',
        controller: 'QACtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('showQA', {
        templateUrl: 'views/qa/admin.html',
        url: '/authenticated/qa/admin',
        controller: 'QaListCtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('showCatalogs', {
        templateUrl: 'views/catalog/admin.html',
        url: '/authenticated/catalog/admin',
        controller: 'CatalogListCtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('editCatalog', {
        templateUrl: 'views/catalog/edit.html',
        url: '/authenticated/catalog/edit/:catalogId',
        controller: 'EditCatalogCtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('newCatalog', {
        templateUrl: 'views/catalog/new.html',
        url: '/authenticated/catalog/create',
        controller: 'CreateCatalogCtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('newProject', {
        templateUrl: 'views/project/new.html',
        url: '/authenticated/project/create',
        controller: 'ProjectCtrl',
        data: {
          roles: ['analyst', 'synthesizer', 'evalutaor', 'admin', 'projectmanager']
        }
      })
      .state('editProject', {
        templateUrl: 'views/project/edit.html',
        url: '/authenticated/project/edit/:projectId',
        controller: 'EditProjectCtrl',
        data: {
          roles: ['analyst', 'synthesizer', 'evalutaor', 'admin', 'projectmanager']
        }
      })
      .state('showProjects', {
        templateUrl: 'views/project/admin.html',
        url: '/authenticated/project/admin',
        controller: 'ProjectListCtrl',
        data: {
          roles: ['analyst', 'projectmanager', 'synthesizer', 'evalutaor', 'admin']
        }
      })
      .state('editCategories', {
        templateUrl: 'views/category/admin.html',
        url: '/authenticated/category/admin',
        controller: 'CategoryCtrl',
        data: {
          roles: ['curator', 'admin']
        }
      })
      .state('editQualityProperties', {
        templateUrl: 'views/qp/admin.html',
        url: '/authenticated/qp/admin',
        controller: 'QualitypropertyCtrl',
        data: {
          roles: ['analyst', 'admin']
        }
      })
      .state('editUsers', {
        templateUrl: 'views/user/admin.html',
        url: '/authenticated/user/admin',
        controller: 'UserCtrl',
        data: {
          roles: ['admin']
        }
      })
      .state('editJIRAConnections', {
        templateUrl: 'views/jiraconnection/admin.html',
        url: '/authenticated/jiraconnection/admin',
        controller: 'JiraconnectionCtrl',
        data: {
          roles: ['projectmanager', 'admin']
        }
      })
      .state('importCatalog', {
        templateUrl: 'views/import/catalog.html',
        url: '/authenticated/import/catalog',
        controller: 'ImportCtrl',
        data: {
          roles: ['admin', 'curator']
        }
      })
      .state('help', {
        templateUrl: 'views/help/help.html',
        url: '/authenticated/help'
      });
  });
