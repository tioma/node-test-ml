/**
 * Created by Artiom on 21/07/2017.
 */
import Busqueda from '../class/busqueda.class.js';

import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	"use strict";
	Busqueda.buscarItems(req.query.q).then((response) => {
		const itemData = Busqueda.procesarDatosItems(response, 4);
		console.log(itemData);
		res.json(itemData);
	}).catch(error => {
		console.log(error);
		res.status(500).send(error);
	});
});

router.get('/:id', (req, res) => {
	"use strict";
	console.log(req.params.id);
	Busqueda.verDetalleItem(req.params.id).then((response) => {
		console.log(response);
		res.json(response);
	}).catch((error) => {
		console.log(error);
		res.status(500).send(error);
	});
});

export default router;