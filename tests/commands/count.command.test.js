const { mockedData } = require('../mocks/mockedData');

test('Should add the number of childrens for each elements if they\'re array', () => {
    const { count } = require('../../commands/count.command');
    const data = count(mockedData);

    expect(data[0].name).toBe('Dillauti [5]');
    expect(data[0].people[0].name).toBe('Winifred Graham [6]');
    expect(data[0].people[1].name).toBe('Blanche Viciani [8]');
    expect(data[0].people[2].name).toBe('Philip Murray [7]');
    expect(data[0].people[3].name).toBe('Bobby Ristori [9]');
    expect(data[0].people[4].name).toBe('Louise Pinzauti [5]');
})