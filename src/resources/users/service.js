import UsersRepository from "./repository";

const UsersService = {};

UsersService.getByUsername = async (username) => {
    try {
        return await UsersRepository.getByUsername(username);
    } catch (err) {
        throw new Error(err);
    }
};

UsersService.addUser = async (user) => {
    try {
        await UsersRepository.addUser(user);
        return user;
    } catch (err) {
        throw new Error(err);
    }
};

export default UsersService;