/**
 * Created by Artiom on 18/07/2017.
 */
mlApp.controller('resultadoCtrl', ['$stateParams', 'busquedaFactory', function($stateParams, busquedaFactory){
	"use strict";
	this.items = [];
	this.categories = [];

	busquedaFactory.buscar($stateParams.search).then(data => {
		this.categories = data.categories;
		this.items = data.items;
	}).catch(error => {
		console.log(error);
	})

}]);