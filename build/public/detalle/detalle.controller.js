'use strict';

/**
 * Created by Artiom on 18/07/2017.
 */
mlApp.controller('detalleCtrl', ['$stateParams', 'busquedaFactory', function ($stateParams, busquedaFactory) {
	"use strict";

	var _this = this;

	this.item = null;

	busquedaFactory.buscarPorId($stateParams.id).then(function (data) {
		_this.item = data.item;
	}).catch(function (error) {
		console.log(error);
	});
}]);

mlApp.filter('productCondition', [function () {
	"use strict";

	return function (input) {
		if (!input) return '';
		if (input == 'new') return 'Nuevo';
		if (input == 'used') return 'Usado';
	};
}]);

mlApp.filter('toTrustedHtml', ['$sce', function ($sce) {
	"use strict";

	return function (input) {
		if (!input) return '';

		return $sce.trustAsHtml(input);
	};
}]);