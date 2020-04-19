const CheckOffensiveValidator = {};

CheckOffensiveValidator.check = (cad, offensivewords) => {
    const words = cad.toLowerCase().split(' ');
    let offensivesFound = [];
    offensivewords.map(ow => {
        if (words.includes(ow.toLowerCase())) {
            offensivesFound = [...offensivesFound, ow];
        }
    })
    // En el caso de que no querer saber las palabras
    // const found = words.some(w => offensivewords.includes(w));
    console.info('Offensive Found', offensivesFound);
    return offensivesFound;
    
}

export default CheckOffensiveValidator;