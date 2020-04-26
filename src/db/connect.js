import { config } from 'dotenv';
import mongoose from 'mongoose';
import OffensiveWordRepository from '../resources/offensivewords/repository';
import RoleEnum from '../resources/users/enum.roles';
import UsersRepository from '../resources/users/repository';

mongoose.Promise = global.Promise;

const settings = config();

const connectToDb = async () => {
    try {
        await mongoose.connect(settings.parsed.MONGO_URL,
            {
                auth: { "authSource": "admin" },
                user: "admin",
                pass: "admin",
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false
            });
        populateOffensiveWords();
        populateAdminUsers();
    } catch (err) {
        console.log(err);
    }
}

const populateOffensiveWords = async () => {
    try {
        const offensiveWords = await OffensiveWordRepository.getAll();
        if (offensiveWords.length === 0) {
            OffensiveWordRepository.addOffensiveWord({ word: 'Caca', level: 3 });
            OffensiveWordRepository.addOffensiveWord({ word: 'Culo', level: 2 });
            OffensiveWordRepository.addOffensiveWord({ word: 'Pedo', level: 5 });
            OffensiveWordRepository.addOffensiveWord({ word: 'Pipi', level: 4 });
            console.info('Populate offensive words success');
        }
    } catch (err) {
        console.log(err);
    }
}

const populateAdminUsers = async () => {
    try {
        const adminUsers = await UsersRepository.getAllAdmins();
        if (adminUsers.length === 0) {
            console.log('Not found any admin user');
            UsersRepository.addUser({username: 'admin1', password: '4321', role: RoleEnum.ROLES.ADMIN});
            UsersRepository.addUser({username: 'admin2', password: '9876', role: RoleEnum.ROLES.ADMIN});
        }
    } catch (err) {
        console.log(err);
    }
}

export default connectToDb;