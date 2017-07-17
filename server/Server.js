
import express from 'express';
import cors from 'cors';
import bp from 'body-parser';

import { serverPort } from '../src/config.json';

import * as db from './database/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use( bp.json() );

app.use( cors({ origin: '*' }) );

export default app;

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
