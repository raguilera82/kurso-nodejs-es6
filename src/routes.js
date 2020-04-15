import hello from './hello/controller';

export default app => {
    app.use('/hello', hello);
}