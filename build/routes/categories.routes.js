'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _busqueda = require('../class/busqueda.class');

var _busqueda2 = _interopRequireDefault(_busqueda);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Artiom on 24/07/2017.
 */
var router = _express2.default.Router();

router.get('/:id', function (req, res) {
	"use strict";

	_busqueda2.default.obtenerCategoria(req.params.id).then(function (response) {
		res.json(response);
	}).catch(function (error) {
		res.status(500).send(error);
	});
});

exports.default = router;