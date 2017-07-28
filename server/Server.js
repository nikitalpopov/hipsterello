import express from 'express';
import session from 'express-session';
import cors from 'cors';
import bp from 'body-parser';
import cp from 'cookie-parser';
import passport from 'passport';
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

require('./Passport')(passport);
app.use( passport.initialize() );
app.use( passport.session() );

require( './database/routes/UserRoutes' )(app, passport);
require( './database/routes/BoardRoutes')(app, passport);
require( './database/routes/ListRoutes' )(app, passport);
require( './database/routes/CardRoutes' )(app, passport);

app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});

export default app;
