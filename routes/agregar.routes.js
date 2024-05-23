import express from 'express';
import { agregarUsuario } from '../controller/usuariosController.js';

const router = express.Router();

router.post('/', agregarUsuario )


export default router;