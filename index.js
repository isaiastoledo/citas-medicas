import express from 'express';
import { registerUser, getUsers } from './routes/routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.post('/register', registerUser);
app.get('/users', getUsers);


app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));