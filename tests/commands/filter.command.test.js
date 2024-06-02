test('Should find & filter result by checking if country.people.animals contains submitted pattern each', () => {
    const steps = [
        {
            pattern: 'duck',
            result: 3
        },
        {
            pattern: 'Duck',
            result: 3
        },
        {
            pattern: 'anoa',
            result: 1
        },
        {
            pattern: 'oa',
            result: 3
        },
        {
            pattern: 'mockTest',
            result: 0
        },
    ]
    const { data } = require('../mocks/data');
    const { filter } = require('../../commands/filter.command');

    steps.forEach((step) => {
        const result = filter(data, step.pattern);

        expect(result).toHaveLength(step.result);
    })
})