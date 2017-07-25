/**
 * Created by Artiom on 24/07/2017.
 */
import Busqueda from '../class/busqueda.class';

import express from 'express';
const router = express.Router();

router.get('/:id', (req, res) => {
	"use strict";
	Busqueda.obtenerCategoria(req.params.id).then((response) => {
		res.json(response);
	}).catch((error) => {
		res.status(500).send(error);
	});
});

export default router;