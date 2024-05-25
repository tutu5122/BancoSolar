import express from 'express';
import { nuevaTrasferencia } from '../controller/trasferenciasController.js';

const router = express.Router();

router.post('/', nuevaTrasferencia )


export default router;