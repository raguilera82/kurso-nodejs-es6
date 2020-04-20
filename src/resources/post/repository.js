import CommentRepository from '../comments/repository';
import Post from './model';

const PostRepository = {};

PostRepository.getAll = async () => {
    return await Post.find({}).select({comments: 0, __v:0});
}

PostRepository.getById = async (id) => {
    const post = await Post.findById(id).populate('comments');
    return post;
}

PostRepository.addPost = async (post) => {
    const newPost = new Post(post);
    return await newPost.save(); 
}

PostRepository.updatePost = async (id, post) => {
    let postUpdate = await Post.findByIdAndUpdate(id, post, {new: true});
    return postUpdate;   
}

PostRepository.deletePost = async (id) => {
    let postDelete = await Post.findByIdAndDelete(id);
    return postDelete;
}

PostRepository.addComment = async (idPost, comment) => {
    const newComment = await CommentRepository.addComment(comment);
    let postUpdate = await Post.findByIdAndUpdate(idPost, {$push: {comments: newComment}}, {new: true});
    return postUpdate;
}

export default PostRepository;