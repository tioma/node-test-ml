/**
 * Created by Artiom on 18/07/2017.
 */
mlApp.controller('resultadoCtrl', ['$stateParams', 'busquedaFactory', function($stateParams, busquedaFactory){
	"use strict";

	busquedaFactory.buscar($stateParams.search).then(data => {
		console.log(data);
	}).catch(error => {
		console.log(error);
	})

}]);