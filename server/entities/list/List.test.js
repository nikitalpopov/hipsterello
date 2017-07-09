/**
 * Created by @nikitalpopov on 10/07/2017.
 */

import mongoose from 'mongoose';
import './List.js';
const List = mongoose.model('List');

it('finds list by boardId', () => {
    // Is not working
    mongoose.model('List').findByBoardId().then((err, res) => {
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
