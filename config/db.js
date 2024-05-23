import pkg from 'pg';
const { Pool } = pkg

// Creamos una instancia de una constante del objeto new Pool (Método de Conexion)
const pool = new Pool({
    connectionString : 'postgresql://postgres:1234@localhost:5432/bancosolar'
})

export default pool