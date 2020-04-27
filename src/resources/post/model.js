import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    nameAuthor: {type: 'String'},
    nickname: {type: 'String'},
    title: {type: 'String', required: true},
    content: {type: 'String'},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }],
    idAuthor: {type: 'String'}
}, {collection: 'posts'})

export default mongoose.model('post', PostSchema);