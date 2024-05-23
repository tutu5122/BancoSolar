import pool from "../config/db.js";

export const agregar = async (nombre, balance) => {
    let client;
    try {
        client = await pool.connect();
        await client.query('INSERT INTO usuarios (nombre, balance) VALUES ($1, $2) RETURNING *' , [nombre, balance]);
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
    } finally {
        if (client){
             client.release();
        }
    }
};

export const consultar = async () => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`SELECT * FROM usuarios`);
        return result.rows;
    } catch (error) {
        console.error('Error al consultar los usuarios:', error);
    } finally {
        if (client){
            client.release();
       }
    }
};

export const eliminar = async ( id ) => {
    let client;
    try {
        client = await pool.connect();
        await client.query(`DELETE FROM usuarios WHERE id = $1`, [id]);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    } finally {
        if (client) client.release();
    }
};