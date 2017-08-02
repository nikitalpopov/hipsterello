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

UserSchema.methods.validatePassword = (inputPassword, passwordHash) => {
    return new Promise((resolve, reject) => {
        let bcryptResult = bcrypt.compareSync(inputPassword, passwordHash);
        (bcryptResult) ? resolve(bcryptResult) : reject('Wrong password');
    });
};

UserSchema.statics.findByEmail = function(request) {
    return new Promise((resolve, reject) => {
        this.model('User')
            .findOne({ email: request })
            .then((result) => {
                (result) ? resolve(result) : reject('User not found');
        });
    });
};

export default UserSchema;
export const User = mongoose.model('User', UserSchema);
