import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

// Configurar express-session
const sessionSecret = process.env.SESSION_SECRET || 'valor_predeterminado';
app.use(session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true
}));

// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar rutas
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log('Servidor escuchando');
});
