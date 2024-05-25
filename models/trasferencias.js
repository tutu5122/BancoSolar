import pool from "../config/db.js";

export const trasferencia = async (emisor, receptor, monto) => {
    let client;
    try {
        client = await pool.connect();
        const emisorSql = await client.query('SELECT * from usuarios WHERE nombre=$1', [emisor])
        const emisorRespuesta =  emisorSql.rows[0];

        if(emisorRespuesta.balance>=monto ){
            const receptorSql = await client.query('SELECT * from usuarios WHERE nombre=$1', [receptor])
            const receptorRespuesta =  receptorSql.rows[0];
    
            await client.query('BEGIN');
            await client.query('INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3, $4)', [emisorRespuesta.id, receptorRespuesta.id, monto, new Date()]);
            // saldo emisor
            await client.query('UPDATE usuarios SET balance = balance - $1 WHERE id = $2', [monto, emisorRespuesta.id]);
            // saldo receptor
            await client.query('UPDATE usuarios SET balance = balance + $1 WHERE id = $2',[monto, receptorRespuesta.id]);
            await client.query('COMMIT');
            return 'Transferencia realizada con éxito'
        }else{
            return 'No hay saldo suficiente'
        }     
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al realizar la traferencia:', error);
    } finally {
        if (client){
            client.release();
       }
    }
}


export const mostrar = async () => {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT t.id, e.nombre AS emisor, r.nombre AS receptor, t.monto, t.fecha
            FROM transferencias t
            JOIN usuarios e ON t.emisor = e.id
            JOIN usuarios r ON t.receptor = r.id;
        `);
        return result.rows;
    } catch (error) {
        console.error('Error al consultar las trasferencias:', error);
    } finally {
        if (client){
            client.release();
       }
    }
};

