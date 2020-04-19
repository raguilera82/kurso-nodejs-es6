import Comment from './model';

const CommentRepository = {};

CommentRepository.addComment = async (comment) => {
    try {
        const newComment = new Comment(comment);
        return await newComment.save();   
    } catch (err) {
        console.log(err);
    }
}

CommentRepository.updateComment = async (idComment, comment) => {
    try {
        const commentUpdated = await Comment.findByIdAndUpdate(idComment, comment, {new: true});
        return commentUpdated;
    } catch (err) {
        console.log(err);
    }
}

CommentRepository.deleteComment = async (idComment) => {
    try {
        const commentDeleted = await Comment.findByIdAndDelete(idComment);
        return commentDeleted;
    } catch (err) {
        console.log(err);
    }
}

export default CommentRepository;