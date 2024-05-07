import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import chalk from 'chalk';

const users = [];

export async function registerUser(req, res) {
    try {
        const response = await axios.get('https://randomuser.me/api/');
        const userData = response.data.results[0];
        const userId = uuidv4();
        const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
        
        const newUser = {
            id: userId,
            name: userData.name.first,
            lastName: userData.name.last,
            gender: userData.gender,
            timestamp: timestamp
        };

        users.push(newUser);

        res.status(200).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}

export function getUsers(req, res) {
    try {
        const usersByGender = _.groupBy(users, 'gender');
        console.log(chalk.bgWhite.blue('Usuarios registrados:', usersByGender));
        res.status(200).json(usersByGender);
    } catch (error) {
        console.error('Error al consultar usuarios:', error.message);
        res.status(500).json({ error: 'Error al consultar usuarios' });
    }
}
