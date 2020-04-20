import CommentRepository from './repository';

const CommentsService = {};

CommentsService.updateComment = async (idComment, comment) => {
    return await CommentRepository.updateComment(idComment, comment);
};

CommentsService.deleteComment = async (idComment) => {
    return await CommentRepository.deleteComment(idComment);
};

export default CommentsService;