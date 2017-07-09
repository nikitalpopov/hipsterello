/**
 * Created by @nikitalpopov on 10/07/2017.
 */

import mongoose from 'mongoose';
import './Board.js';
const Board = mongoose.model('Board');

it('finds board by userId', () => {
    // Is not working
    mongoose.model('Board').findByUserId().then((err, res) => {
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
