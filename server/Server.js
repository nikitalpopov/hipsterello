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
require('./Passport')(passport);

app.use( morgan('dev') );
app.use( cp() );
app.use( bp.json() );
app.use( cors({ origin: '*' }) );

app.use( session({ secret: 'hipsterello' }) );
app.use( passport.initialize() );
app.use( passport.session() );

// app.use( require('./database/routes/UserRoutes') );
// app.use( require('./database/routes/BoardRoutes') );
// app.use( require('./database/routes/ListRoutes') );
// app.use( require('./database/routes/CardRoutes') );

require( './database/routes/UserRoutes' )(app, passport);
require( './database/routes/BoardRoutes' )(app, passport);
require( './database/routes/ListRoutes' )(app, passport);
require( './database/routes/CardRoutes' )(app, passport);

export default app;

const server = app.listen(serverPort, () => {
    console.log(`Server is up and running on port ${serverPort}`);
});
