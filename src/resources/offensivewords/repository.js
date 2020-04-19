import OffensiveWord from './model';

const OffensiveWordRepository = {};

OffensiveWordRepository.addOffensiveWord = async (offensiveworld) => {
    try {
        const newOffensiveWorld = new OffensiveWord(offensiveworld);
        return await newOffensiveWorld.save();
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordRepository.getAll = async () => {
    try {
        return await OffensiveWord.find({});
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordRepository.delete = async(id) => {
    try {
        return await OffensiveWord.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
}

OffensiveWordRepository.update = async(id, offensiveword) => {
    try {
        return await OffensiveWord.findByIdAndUpdate(id, offensiveword, {new: true});
    } catch (err) {
        console.log(err);
    }
}

export default OffensiveWordRepository;