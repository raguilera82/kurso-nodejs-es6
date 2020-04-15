import express from 'express';
import appConfig from './config';
import routes from './routes';

let app = express();

appConfig(app);
routes(app);

export default app;