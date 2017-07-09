/**
 * Created by @nikitalpopov on 09/07/2017.
 */

import mongoose from 'mongoose';
import './User.js';
const User = mongoose.model('User');

it('finds user by email', () => {
    // Is not working
    mongoose.model('User').findByEmail('test').then((err, res) => {
        if (err) {
            throw err;
        }
        else {
            console.log(res);
        }
    }).catch((err) => {
        throw new Error('Error: ' + err.message)
    });
});
