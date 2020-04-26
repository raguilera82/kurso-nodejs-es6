import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import RoleEnum from './enum.roles';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: 'String' },
    password: { type: 'String' },
    role: { type: 'String', enum: [RoleEnum.ROLES.ADMIN, RoleEnum.ROLES.PUBLISHER] }
}, { collection: 'users' });

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export default mongoose.model('user', UserSchema);