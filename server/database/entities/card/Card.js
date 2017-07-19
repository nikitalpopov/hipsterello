/**
 * Created by admin on 07.07.2017.
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default CardSchema;
export const Card = mongoose.model('Card', CardSchema);
