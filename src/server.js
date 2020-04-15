import { config } from 'dotenv';
import app from './app';


const settings = config();

const appPort = settings.parsed.APP_PORT;
app.listen(appPort, () => {
    console.log('App running', appPort);
});