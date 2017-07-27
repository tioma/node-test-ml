'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Artiom on 24/07/2017.
 */
mlApp.factory('Item', ['$http', '$q', 'API_ENDPOINT', function ($http, $q, API_ENDPOINT) {
	var Item = function () {
		function Item(itemData) {
			_classCallCheck(this, Item);

			if (itemData) {
				angular.extend(this, itemData);
				this.getCategory();
			}
		}

		_createClass(Item, [{
			key: 'getCategory',
			value: function getCategory() {
				var _this = this;

				var uri = API_ENDPOINT + '/categorias/' + this.category_id;
				$http.get(uri).then(function (response) {
					_this.categorias = response.data;
				}).catch(function (error) {
					_this.categorias = [];
				});
			}
		}, {
			key: 'comprar',
			value: function comprar() {
				console.log('no implementado');
			}
		}]);

		return Item;
	}();

	return Item;
}]);