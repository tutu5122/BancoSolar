import express from 'express';
import { consultarUsuarios } from '../controller/usuariosController.js';

const router = express.Router();

router.get('/', consultarUsuarios )


export default router;