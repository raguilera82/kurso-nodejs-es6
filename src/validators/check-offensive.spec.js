import CheckOffensiveValidator from "./check-offensive";

describe('Check offensive word', () => {

    it('should say offensive word depends on level', () => {
        const content = 'Hola mundo de Caca';
        const offensiveWords = [
            {word: 'caca', level: 1}
        ];

        const ofensiveFounds = CheckOffensiveValidator.check(content, offensiveWords, 2);

        expect(ofensiveFounds.length).toEqual(1);
    })

    it('should say no offensive word depends on level', () => {
        const content = 'Hola mundo caca';
        const offensiveWords = [
            {word: 'caca', level: 5}
        ];

        const ofensiveFounds = CheckOffensiveValidator.check(content, offensiveWords, 2);

        expect(ofensiveFounds.length).toEqual(0);
    })

    it('should say no offensive word no exits', () => {
        const content = 'Hola mundo';
        const offensiveWords = [];

        const ofensiveFounds = CheckOffensiveValidator.check(content, offensiveWords, 2);

        expect(ofensiveFounds.length).toEqual(0);
    })

})