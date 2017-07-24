/**
 * Created by admin on 06.07.2017.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validatePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.findByEmail = function(request) {
    return this.model('User').findOne({  email: request });
};

export default UserSchema;
export const User = mongoose.model('User', UserSchema);
