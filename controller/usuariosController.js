import { agregar, consultar, eliminar } from '../models/usuarios.js';

export const agregarUsuario = async (req, res) => {
    const { nombre, balance } = req.body;
    try {
        await agregar(nombre, balance);
        res.status(201).send('Usuario agregado correctamente');
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const consultarUsuarios = async (req, res) => {
    try {
        const usuarios = await consultar();
        res.status(201).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios', error);
        res.status(500).send('Error interno del servidor');
    }
};

export const eliminarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        await eliminar(id);
        res.status(200).send('Usuario Eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).send('Error interno del servidor');
    }
};
