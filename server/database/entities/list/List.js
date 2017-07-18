/**
 * Created by admin on 07.07.2017.
 */
import mongoose from 'mongoose';

import CardSchema from '../card/Card';

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title: {
        type: String
    },
    color: {
        type: String,
        default: '#f0f0f0'
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

ListSchema.statics.findByBoardId = function(request) {
    return this.model('List').find({ 'boardId' : request });
};

export default ListSchema;
export const List = mongoose.model('List', ListSchema);
