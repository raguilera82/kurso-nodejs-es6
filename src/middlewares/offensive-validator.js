import OffensiveWordRepository from "../resources/offensivewords/repository";
import CheckOffensiveValidator from "../validators/check-offensive";

const OffensiveValidator = {};

OffensiveValidator.checkwords = async (req, res, next) => {
    const comment = req.body;
    const offensivewordsDB = await OffensiveWordRepository.getAll();

    const offensivewords = offensivewordsDB.map(owdb => owdb.word);

    const offensivewordsFound = CheckOffensiveValidator.check(comment.comment, offensivewords);
    if (offensivewordsFound.length === 0) {
        next();
    }else{
        res.status(403).json({message: 'No puedes utilizar: ' + offensivewordsFound});
    }
}

export default OffensiveValidator;