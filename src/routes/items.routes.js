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
		res.json(itemData);
	}).catch(error => {
		res.status(500).send(error);
	});
});

router.get('/:id', (req, res) => {
	"use strict";
	Busqueda.verDetalleItem(req.params.id).then((response) => {
		res.json(response);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

export default router;