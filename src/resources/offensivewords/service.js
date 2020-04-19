import OffensiveWordRepository from "./repository";

const OffensiveWordService = {};

OffensiveWordService.add = async (offensiveword) => {
    return await OffensiveWordRepository.addOffensiveWord(offensiveword);
}

OffensiveWordService.getAll = async() => {
    return await OffensiveWordRepository.getAll();
}

OffensiveWordService.update = async(id, offensiveword) => {
    return await OffensiveWordRepository.update(id, offensiveword);
}

OffensiveWordService.delete = async(id) => {
    return await OffensiveWordRepository.delete(id);
}

export default OffensiveWordService;