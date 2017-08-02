import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bp from 'body-parser';
import cp from 'cookie-parser';
import morgan from 'morgan';

import { serverPort } from '../src/config.json';
import * as db from './database/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use( morgan('dev') );

app.use( cors({ origin: '*' }) );
app.use( cp() );
app.use( bp.json() );
app.use( bp.urlencoded({ extended: false }) );
app.use(
    session({
        secret: 'hipsterello',
        resave: false,
        saveUninitialized: false
    })
);

app.use( require('./database/routes/UserRoutes') );
app.use( require('./database/routes/BoardRoutes') );
app.use( require('./database/routes/ListRoutes') );
app.use( require('./database/routes/CardRoutes') );

app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});

export default app;
