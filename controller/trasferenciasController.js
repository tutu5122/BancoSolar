import { trasferencia, mostrar } from '../models/trasferencias.js';

export const nuevaTrasferencia = async (req, res) => {
    try {
        const { emisor, receptor, monto } = req.body;
        const mensaje = await trasferencia(emisor, receptor, monto );
        res.status(200).json({ message: mensaje });
    } catch (error) {
        console.error('Error al realizar la trasferencia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const mostrarTrasferencias = async (req, res) => {
    try {
        const consultarTrasferencias = await mostrar();
        res.status(201).json(consultarTrasferencias);
    } catch (error) {
        console.error('Error al obtener las transferencias:', error);
        res.status(500).send('Error interno del servidor');
    }
};