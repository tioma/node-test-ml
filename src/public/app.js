/**
 * Created by Artiom on 18/07/2017.
 */
'use strict';

const mlApp = angular.module('mlApp', [
	'ui.router',
	'ui.bootstrap',
	'ngSanitize'
]);

mlApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('busqueda', {
		url: '/',
		templateUrl: 'busqueda/busqueda.view.html',
		controller: 'busquedaCtrl as vmBusqueda'
	}).state('busqueda.resultado', {
		url: 'items?search',
		templateUrl: 'resultado/resultado.view.html',
		controller: 'resultadoCtrl as vmResultado'
	}).state('busqueda.detalle', {
		url: 'items/:id',
		templateUrl: 'detalle/detalle.view.html',
		controller: 'detalleCtrl as vmDetalle'
	});

	$locationProvider.html5Mode(true);

}]);

mlApp.constant('API_ENDPOINT', 'http://localhost:3002/api');
