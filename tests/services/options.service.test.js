const { getOption } = require('../../services/options.service');

jest.mock('../../services/config.service', () => ({
    getFromConfig: jest.fn().mockReturnValue('count,filter')
}));

describe('getOption', () => {
    test('Should get option set by user without useless format', () => {
        process.argv = [null, null, '--count'];
    
        const option = getOption();
    
        expect(option).toHaveProperty('name');
        expect(option).toHaveProperty('value');
        expect(option.name).toBe('count');
    })
    
    test('Should get a value if option is filter with equal', () => {
        process.argv = [null, null, '--filter=bu'];
    
        const option = getOption();
    
        expect(option).toHaveProperty('name');
        expect(option).toHaveProperty('value');
        expect(option.name).toBe('filter');
        expect(option.value).toBe('bu');
    })
})

describe('getOptions errors', () => {
    test('Should send an error if not option is defined', () => {
        process.argv = [null, null];
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    
        expect(() => getOption()).toThrow('process.exit');
    })
    
    test('Should send an error if option is filter and there isn\'t value', () => {
        process.argv = [null, null, '--filter='];
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    
        expect(() => getOption()).toThrow('process.exit');
    
        process.argv = [null, null, '--filter'];
    
        expect(() => getOption()).toThrow('process.exit');
    })
    
    test('Should send an error if option is not a part of available options', () => {
        process.argv = [null, null, '--baz'];
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    
        expect(() => getOption()).toThrow('process.exit');
    
        process.argv = [null, null, '--baz=bi'];
    
        expect(() => getOption()).toThrow('process.exit');
    })
})