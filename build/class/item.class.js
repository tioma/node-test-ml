'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Artiom on 22/07/2017.
 */

function obtenerCantidadDecimales(precio) {
	var numeroSeparado = precio.toString().split('.');
	if (numeroSeparado.length > 1) {
		return numeroSeparado[1].length;
	} else {
		return 0;
	}
}

var Item = function () {
	function Item() {
		var itemData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		_classCallCheck(this, Item);

		if (itemData) this.setData(itemData);
	}

	_createClass(Item, [{
		key: 'setData',
		value: function setData(itemData) {
			this.id = itemData.id;
			this.title = itemData.title;
			this.price = {
				currency: itemData.currency_id,
				amount: itemData.price,
				decimals: obtenerCantidadDecimales(itemData.price)
			};
			this.picture = itemData.thumbnail;
			this.condition = itemData.condition;
			this.free_shipping = itemData.shipping.free_shipping;
			this.category_id = itemData.category_id;
		}
	}]);

	return Item;
}();

exports.default = Item;