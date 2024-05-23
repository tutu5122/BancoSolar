import express from 'express';
import { eliminarUsuario } from '../controller/usuariosController.js';

const router = express.Router();

router.delete('/:id', eliminarUsuario )


export default router;