import { config } from 'dotenv';
import mongoose from 'mongoose';
import OffensiveWordRepository from '../resources/offensivewords/repository';

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

export default connectToDb;