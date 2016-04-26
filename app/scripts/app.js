'use strict';

/**
 * @ngdoc overview
 * @name d3jsApp
 * @description
 * # d3jsApp
 *
 * Main module of the application.
 */
angular
  .module('d3jsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/axis', {
        templateUrl: 'views/axis.html'
      })
      .when('/histogram', {
        templateUrl: 'views/histogram.html'
      })
      .when('/pie', {
        templateUrl: 'views/pie.html'
      })
      .when('/force', {
        templateUrl: 'views/force.html'
      })
      .when('/chord', {
        templateUrl: 'views/chord.html'
      })
      .when('/cluster', {
        templateUrl: 'views/cluster.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
