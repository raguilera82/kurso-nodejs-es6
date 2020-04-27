import AuthController from './resources/auth/controller';
import CommentController from './resources/comments/controller';
import HelloController from './resources/hello/controller';
import OffensiveWordController from './resources/offensivewords/controller';
import PostController from './resources/post/controller';
import UsersController from './resources/users/controller';

export default app => {
    app.use('/hello', HelloController);
    app.use('/posts', PostController);
    app.use('/comments', CommentController);
    app.use('/offensivewords', OffensiveWordController);
    app.use('/auth', AuthController);
    app.use('/users', UsersController);
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
