import Comment from './model';

const CommentRepository = {};

CommentRepository.addComment = async (comment) => {
    const newComment = new Comment(comment);
    return await newComment.save();   
}

CommentRepository.updateComment = async (idComment, comment) => {
    const commentUpdated = await Comment.findByIdAndUpdate(idComment, comment, {new: true});
    return commentUpdated;
    
}

CommentRepository.deleteComment = async (idComment) => {
    const commentDeleted = await Comment.findByIdAndDelete(idComment);
    return commentDeleted;
}

export default CommentRepository;