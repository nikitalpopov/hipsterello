/**
 * Created by admin on 07.07.2017.
 */
import mongoose from 'mongoose';

import ListSchema from '../list/List';

const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        // required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BoardSchema.statics.findByUserId = function(request) {
    return this.model('Board').find({ 'userId': request });
};

export default BoardSchema;
export const Board = mongoose.model('Board', BoardSchema);
