import CommentController from './resources/comments/controller';
import helloController from './resources/hello/controller';
import OffensiveWordController from './resources/offensivewords/controller';
import postController from './resources/post/controller';

export default app => {
    app.use('/hello', helloController);
    app.use('/post', postController);
    app.use('/comment', CommentController);
    app.use('/offensivewords', OffensiveWordController);
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
}

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).send({ error: err.message });
}
