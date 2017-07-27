'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Artiom on 21/07/2017.
 */
mlApp.factory('busquedaFactory', ['$http', '$q', 'API_ENDPOINT', 'Item', function ($http, $q, API_ENDPOINT, Item) {
	"use strict";

	var Busqueda = function () {
		function Busqueda() {
			_classCallCheck(this, Busqueda);
		}

		_createClass(Busqueda, [{
			key: 'buscar',
			value: function buscar(param) {
				var deferred = $q.defer();
				var inserturl = API_ENDPOINT + '/items';
				$http.get(inserturl, { params: { q: param } }).then(function (response) {
					response.data.items = response.data.items.map(function (itemData) {
						return new Item(itemData);
					});
					deferred.resolve(response.data);
				}).catch(function (error) {
					console.log(error);
					deferred.reject(error);
				});
				return deferred.promise;
			}
		}, {
			key: 'buscarPorId',
			value: function buscarPorId(id) {
				var deferred = $q.defer();
				var inserturl = API_ENDPOINT + '/items/' + id;
				$http.get(inserturl).then(function (response) {
					response.data.item = new Item(response.data.item);
					deferred.resolve(response.data);
				}).catch(function (error) {
					console.log(error);
					deferred.reject();
				});
				return deferred.promise;
			}
		}]);

		return Busqueda;
	}();

	return new Busqueda();
}]);