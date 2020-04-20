import OffensiveWord from './model';

const OffensiveWordRepository = {};

OffensiveWordRepository.addOffensiveWord = async (offensiveworld) => {
    const newOffensiveWorld = new OffensiveWord(offensiveworld);
    return await newOffensiveWorld.save();
}

OffensiveWordRepository.getAll = async () => {
    return await OffensiveWord.find({});
}

OffensiveWordRepository.delete = async (id) => {
    return await OffensiveWord.findByIdAndDelete(id);
}

OffensiveWordRepository.update = async (id, offensiveword) => {
    return await OffensiveWord.findByIdAndUpdate(id, offensiveword, { new: true });
}

export default OffensiveWordRepository;