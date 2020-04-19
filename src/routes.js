import CommentController from './resources/comments/controller';
import helloController from './resources/hello/controller';
import OffensiveWordController from './resources/offensivewords/controller';
import postController from './resources/post/controller';

export default app => {
    app.use('/hello', helloController);
    app.use('/post', postController);
    app.use('/comment', CommentController);
    app.use('/offensivewords', OffensiveWordController);
}