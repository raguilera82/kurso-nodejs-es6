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

PostService.updatePost = async (id, post) => {
    return await PostRepository.updatePost(id, post);
}

PostService.deletePost = async (id) => {
    return await PostRepository.deletePost(id);
}

PostService.addComment = async (id, comment) => {
    return await PostRepository.addComment(id, comment);
}

export default PostService;

