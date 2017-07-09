/**
 * Created by @nikitalpopov on 10/07/2017.
 */

import mongoose from 'mongoose';
import './Card.js';
const Card = mongoose.model('Card');

it('finds card by listId', () => {
    // Is not working
    mongoose.model('Card').findByListId().then((err, res) => {
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
