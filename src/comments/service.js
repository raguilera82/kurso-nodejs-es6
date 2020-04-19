import CommentRepository from "./repository";

const CommentsService = {};

CommentsService.updateComment = async (idComment, comment) => {
    try {
        return await CommentRepository.updateComment(idComment, comment);
    } catch (err) {
        console.log(err);
    }
};

CommentsService.deleteComment = async (idComment) => {
    try {
        return await CommentRepository.deleteComment(idComment);
    } catch (err) {
        console.log(err);
    }
};

export default CommentsService;