import Post from "./model";

const PostRepository = {};

PostRepository.getAll = async () => {
    try {
        return await Post.find({}).select({comments: 0, __v:0});
    }catch(err) {
        console.log(err);
    }
}

PostRepository.getById = async (id) => {
    try {
        console.log('Busco: ' + id);
        const post = await Post.findById(id);
        console.log(post);
        return post;
    } catch (err) {
        console.log(err);
    }
}

PostRepository.addPost = async (post) => {
    const newPost = new Post(post);
    return await newPost.save();
}

PostRepository.updatePost = async (id, post) => {
    try {
        let postUpdate = await Post.findByIdAndUpdate(id, post, {new: true});
        return postUpdate;   
    } catch (err) {
        console.log(err);
    }
}

PostRepository.deletePost = async (id) => {
    try {
        let postDelete = await Post.findByIdAndDelete(id);
        return postDelete;
    } catch (err) {
        console.log(err);
    }
}

export default PostRepository;