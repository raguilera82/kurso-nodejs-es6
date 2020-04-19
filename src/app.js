import express from 'express';
import appConfig from './config';
import connectToDb from './db/connect';
import routes from './routes';

let app = express();

connectToDb();
appConfig(app);
routes(app);


export default app;