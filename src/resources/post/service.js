import PostRepository from './repository';

const PostService = {};

PostService.getAll = async () => {
    return await PostRepository.getAll();
}

PostService.getById = async (id) => {
    const post = await PostRepository.getById(id);
    return post;
}

PostService.addPost = async (post) => {
    return await PostRepository.addPost(post);
}

PostService.updatePost = async (id, postUpdate, user) => {
    try {
        const post = await PostService.getById(id);
        if (post !== null) {
            console.log('user', user);
            if (post.idAuthor === user._id.toString()  || user.role === enumRoles.ROLES.ADMIN) {
                return await PostRepository.updatePost(id, postUpdate);
            }else{
                const unauthorizedError = new Error('Este post no es tuyo');
                unauthorizedError.code = 401;
                throw unauthorizedError;
            }
        }else{
            const notFoundError = new Error('Post no encontrado')
            notFoundError.code = 404;
            throw notFoundError;
        }
    } catch (err) {
        err.code = 500;
        throw err;
    }
    
}

PostService.deletePost = async (id) => {
    return await PostRepository.deletePost(id);
}

PostService.addComment = async (id, comment) => {
    return await PostRepository.addComment(id, comment);
}

export default PostService;

