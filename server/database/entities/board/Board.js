/**
 * Created by admin on 07.07.2017.
 */

import mongoose from 'mongoose';

import ListSchema from '../list/List';
import CardSchema from '../card/Card';

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    usersId: {
        type: [Schema.Types.ObjectId],
    },
    title: {
        type: String
    },
    color: {
        type: String,
        default: '#dcdcdc'
    },
    lists: {
        type: [ListSchema],
        default: []
    },
    cards: {
        type: [CardSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default BoardSchema;
export const Board = mongoose.model('Board', BoardSchema);
