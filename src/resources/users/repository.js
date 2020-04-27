import RoleEnum from './enum.roles';
import User from './model';

const UsersRepository = {};

UsersRepository.getAllAdmins = async () => {
    return await User.find({role: RoleEnum.ROLES.ADMIN});
}

UsersRepository.getByUsername = async (username) => {
    const user = await User.findOne({username});
    return user;
}

UsersRepository.addUser = async function(user) {
    const newUser = new User(user);
    return await newUser.save();
}

export default UsersRepository;