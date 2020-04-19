const CheckOffensiveValidator = {};

CheckOffensiveValidator.check = (cad, offensivewords, level) => {
    console.log('LEVEL: ' + level);
    const words = cad.toLowerCase().split(' ');
    let offensivesFound = [];
    offensivewords.map(ow => {
        if (isOffensiveWordLevel(words, ow, level)) {
            offensivesFound = [...offensivesFound, ow];
        }
    })
    // En el caso de que no querer saber las palabras
    // const found = words.some(w => offensivewords.includes(w));
    console.info('Offensive Found', offensivesFound);
    return offensivesFound;
    
}

function isOffensiveWordLevel(words, ow, level) {
    return words.includes(ow.word.toLowerCase()) && Number.parseInt(ow.level) <= Number.parseInt(level);
}

export default CheckOffensiveValidator;

