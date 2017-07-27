'use strict';

/**
 * Created by Artiom on 18/07/2017.
 */
mlApp.controller('resultadoCtrl', ['$stateParams', 'busquedaFactory', function ($stateParams, busquedaFactory) {
	"use strict";

	var _this = this;

	this.items = [];
	this.categories = [];

	busquedaFactory.buscar($stateParams.search).then(function (data) {
		_this.categories = data.categories;
		_this.items = data.items;
	}).catch(function (error) {
		console.log(error);
	});
}]);