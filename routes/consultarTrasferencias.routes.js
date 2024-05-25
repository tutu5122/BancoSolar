import express from 'express';
import { mostrarTrasferencias } from '../controller/trasferenciasController.js';

const router = express.Router();

router.get('/', mostrarTrasferencias )


export default router;