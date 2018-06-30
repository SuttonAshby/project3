import { db } from '../config/db';

export const addUser =  (user) => {
    db.ref('/users').push(user);
}