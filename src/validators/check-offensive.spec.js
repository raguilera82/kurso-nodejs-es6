import CheckOffensiveValidator from "./check-offensive";

describe('Check offensive word', () => {

    it('should say offensive word', () => {
        const content = 'Hola mundo de Caca';
        const offensiveWords = ['caca'];

        const ofensiveFounds = CheckOffensiveValidator.check(content, offensiveWords);

        expect(ofensiveFounds.length).toEqual(1);
    })

    it('should say no offensive word', () => {
        const content = 'Hola mundo';
        const offensiveWords = ['caca'];

        const ofensiveFounds = CheckOffensiveValidator.check(content, offensiveWords);

        expect(ofensiveFounds.length).toEqual(0);
    })

})