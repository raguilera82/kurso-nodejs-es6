import { config } from 'dotenv';
import OffensiveWordRepository from '../resources/offensivewords/repository';
import CheckOffensiveValidator from '../validators/check-offensive';

const settings = config();

const OffensiveValidator = {};

OffensiveValidator.checkwords = async (req, res, next) => {
    const comment = req.body;
    const offensivewordsDB = await OffensiveWordRepository.getAll();

    const offensivewords = offensivewordsDB.map(owdb => {
        return { word: owdb.word, level: owdb.level }
    });

    const offensivewordsFound = CheckOffensiveValidator.check(comment.comment, offensivewords, settings.parsed.LEVEL_OFFENSIVE);
    if (offensivewordsFound.length === 0) {
        next();
    }else{
        const info = offensivewordsFound.map(ow => ow.word + ' con nivel ' + ow.level);
        res.status(403).json({message: 'No puedes utilizar: ' + info});
    }
}

export default OffensiveValidator;