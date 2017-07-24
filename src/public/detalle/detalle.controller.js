/**
 * Created by Artiom on 18/07/2017.
 */
mlApp.controller('detalleCtrl', ['$stateParams', 'busquedaFactory', '$sce', function($stateParams, busquedaFactory, $sce){
	"use strict";
	this.item = null;

	busquedaFactory.buscarPorId($stateParams.id).then(data => {
		this.item = data.item;
	}).catch(error => {
		console.log(error);
	});

	this.trustHtml = (data) => {
		console.log('si, paso por aca');
		console.log($sce.trustAsHtml(data));
		return $sce.trustAsHtml(data);
	}

}]);

mlApp.filter('productCondition', [function(){
	"use strict";
	return function(input){
		if (!input) return '';
		if (input == 'new') return 'Nuevo'
	}
}]);

mlApp.filter('productDescription', ['$sce', function($sce){
	"use strict";

	return function(input) {
		if (!input) return '';


		let output = '';
		input.split("\r\n").forEach((paragraph) => {
			output += '<p>' + paragraph + '</p>';
		});

		return $sce.trustAsHtml(output);
	};

}]);