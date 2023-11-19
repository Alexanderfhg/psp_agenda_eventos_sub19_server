import { Router } from 'express';
import { promisify } from 'util';
import { hash, compare } from 'bcrypt';
import db from '../db.js';

const router = Router();
const queryAsync = promisify(db.query).bind(db);

// Registrar usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hash(password, 10);

        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await queryAsync(query, [name, email, hashedPassword]);
        res.status(200).send('Registro exitoso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el registro');
    }
});

// Ingresar usuario
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = ?';
        const result = await queryAsync(query, [email]);

        if (result.length > 0) {
            const match = await compare(password, result[0].password);

            if (match) {
                req.session.userId = result[0].id;
                res.status(200).send('Inicio de sesión exitoso');
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el inicio de sesión');
    }
});

export default router;
