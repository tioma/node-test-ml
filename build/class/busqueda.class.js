'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by kolesnikov-a on 04/05/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

var _item = require('./item.class');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Busqueda = function () {
	function Busqueda() {
		_classCallCheck(this, Busqueda);
	}

	_createClass(Busqueda, null, [{
		key: 'procesarDatosItems',
		value: function procesarDatosItems(datos, cantidad) {
			var fullItems = datos.results.slice(0, cantidad);
			var sortedCategories = datos.available_filters[0].values.sort(function (a, b) {
				return a.results - b.results;
			}).map(function (categorie) {
				return categorie.name;
			});

			var items = [];
			fullItems.forEach(function (fullItem) {
				var item = new _item2.default(fullItem);
				item.address_city = fullItem.address.state_name;
				items.push(item);
			});

			var response = {
				author: _config2.default.author,
				categories: sortedCategories,
				items: items
			};

			return response;
		}
	}, {
		key: 'buscarItems',
		value: function buscarItems(param) {
			var options = {
				uri: 'https://api.mercadolibre.com/sites/MLA/search?q=' + param,
				json: true
			};
			return new Promise(function (resolve, reject) {
				(0, _requestPromise2.default)(options).then(function (data) {
					resolve(data);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'verDetalleItem',
		value: function verDetalleItem(itemId) {
			var optionsItemId = {
				uri: 'https://api.mercadolibre.com/items/' + itemId,
				json: true
			};
			var optionsItemDescription = {
				uri: 'https://api.mercadolibre.com/items/' + itemId + '/description',
				json: true
			};

			var apiCalls = [(0, _requestPromise2.default)(optionsItemId), (0, _requestPromise2.default)(optionsItemDescription)];

			return new Promise(function (resolve, reject) {
				Promise.all(apiCalls).then(function (responses) {
					var itemData = responses[0];
					var itemDescription = responses[1];

					var item = new _item2.default(itemData);
					item.sold_quantity = itemData.sold_quantity;
					if (itemDescription.text) {
						item.description = itemDescription.text;
					} else {
						item.description = '';
						itemDescription.plain_text.split('\r\n').forEach(function (parrafo) {
							item.description += '<p>' + parrafo + '</p>';
						});
					}

					var response = {
						author: _config2.default.author,
						item: item
					};
					resolve(response);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}, {
		key: 'obtenerCategoria',
		value: function obtenerCategoria(idCategoria) {
			var options = {
				uri: 'https://api.mercadolibre.com/categories/' + idCategoria,
				json: true
			};
			return new Promise(function (resolve, reject) {
				(0, _requestPromise2.default)(options).then(function (data) {
					var categorias = data.path_from_root.map(function (categoria) {
						return categoria.name;
					});
					resolve(categorias);
				}).catch(function (error) {
					reject(error);
				});
			});
		}
	}]);

	return Busqueda;
}();

exports.default = Busqueda;