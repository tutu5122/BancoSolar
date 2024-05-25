import express from 'express';
import { editarUsuario } from '../controller/usuariosController.js';

const router = express.Router();

router.put('/:id', editarUsuario )


export default router;