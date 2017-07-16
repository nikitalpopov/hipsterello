/**
 * Created by admin on 07.07.2017.
 */
import mongoose from 'mongoose';

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
    listsId: {
        type: [Schema.Types.ObjectId],
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

export const Board = mongoose.model('Board', BoardSchema);
