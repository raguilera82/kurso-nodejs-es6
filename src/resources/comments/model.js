import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    nickname: {type: 'String'},
    comment: {type: 'String'}
});

export default mongoose.model('comments', CommentSchema);