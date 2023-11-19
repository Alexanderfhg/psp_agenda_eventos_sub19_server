import { createConnection } from 'mysql2';

// Configuración de la conexión a la base de datos
const db = createConnection({
    host: 'monorail.proxy.rlwy.net',
    port: 24101,
    user: 'root',
    password: '1-fE1GDb-f15C16fA5hFfBgeHdDDE4EH',
    database: 'railway'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos');
});

// Exportar la conexión
export default db;
