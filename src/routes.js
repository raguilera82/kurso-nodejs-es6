import helloController from './hello/controller';
import postController from './post/controller';

export default app => {
    app.use('/hello', helloController);
    app.use('/post', postController);
}