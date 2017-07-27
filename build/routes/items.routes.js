'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _busquedaClass = require('../class/busqueda.class.js');

var _busquedaClass2 = _interopRequireDefault(_busquedaClass);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Artiom on 21/07/2017.
 */
var router = _express2.default.Router();

router.get('/', function (req, res) {
	"use strict";

	_busquedaClass2.default.buscarItems(req.query.q).then(function (response) {
		var itemData = _busquedaClass2.default.procesarDatosItems(response, 4);
		res.json(itemData);
	}).catch(function (error) {
		res.status(500).send(error);
	});
});

router.get('/:id', function (req, res) {
	"use strict";

	_busquedaClass2.default.verDetalleItem(req.params.id).then(function (response) {
		res.json(response);
	}).catch(function (error) {
		res.status(500).send(error);
	});
});

exports.default = router;