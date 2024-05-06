import express from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
const router = express.Router();

let users = [
    { id: '37adc3', name: 'Vicenta', lastName: 'Marin', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:32:35 pm' },
    { id: '27db77', name: 'Manuela', lastName: 'Ramos', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:32:37 pm' },
    { id: 'eb23a1', name: 'Nadia', lastName: 'Marie', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:32:47 pm' },
    { id: 'a51620', name: 'Anais', lastName: 'Meunier', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:32:54 pm' },
    { id: 'ea4c12', name: 'Grace', lastName: 'Green', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:32:57 pm' },
    { id: '30a5c6', name: 'Vildan', lastName: 'Tahincig', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:33:00 pm' },
    { id: '107d62', name: 'Silvia', lastName: 'Westhof', gender: 'female', timestamp: 'Noviembre 4th 2021, 7:33:03 pm' },
    { id: '38eecl', name: 'Luis', lastName: 'Lango', gender: 'male', timestamp: 'Noviembre 4th 2021, 7:32:40 pm' },
    { id: '7d67fa', name: 'Cooper', lastName: 'Wood', gender: 'male', timestamp: 'Noviembre 4th 2021, 7:32:43 pm' },
    { id: '8d1aa2', name: 'Patrick', lastName: 'Lee', gender: 'male', timestamp: 'Noviembre 4th 2021, 7:33:06 pm' },
    { id: '37cc96', name: 'Tracy', lastName: 'Reynolds', gender: 'male', timestamp: 'Noviembre 4th 2021, 7:33:10 pm' }
];

router.post('/register', async (req, res) => {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0];

        const newUser = {
            id: uuidv4(),
            name: userData.name.first,
            lastName: userData.name.last,
            gender: userData.gender,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a')
        };

        users.push(newUser);

        res.status(200).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

router.get('/users', (req, res) => {
    try {
        const usersByGender = _.groupBy(users, 'gender');
        console.log(usersByGender);
        res.status(200).json(usersByGender);
    } catch (error) {
        console.error('Error al consultar usuarios:', error.message);
        res.status(500).json({ error: 'Error al consultar usuarios' });
    }
});

export default router;
