/**
 * Created by @nikitalpopov on 06/07/2017.
 */

import mongoose from 'mongoose';
import bluebird from 'bluebird';

import config from '../../src/config.json';

mongoose.Promise = bluebird;

export function setUpConnection() {
    mongoose.connect(
        `mongodb://${config.db.username}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`,
        { useMongoClient: true }
    );
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

export function closeConnection() {
    mongoose.connection.close();
    mongoose.connection.once('close', () => {
        console.log('Disconnected from MongoDB');
    });
}
