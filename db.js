import { createConnection } from 'mysql2';

// Configuración de la conexión a la base de datos
const db = createConnection({
    host: 'events-calendar.cqawfiwiwudi.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'VrJO3fEoTdOL2KamsW9u',
    database: 'events-calendar'
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
