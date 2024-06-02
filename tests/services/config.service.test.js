const fs = require('fs');

jest.mock('fs', () => ({
    existsSync: jest.fn(),
    readFileSync: jest.fn()
}));

describe('Load config success', () => {
    test('Should load config if env file exists & variable is defined', () => {
        const { loadConfig } = require('../../services/config.service');
    
        fs.existsSync.mockReturnValueOnce(true);
        fs.readFileSync.mockReturnValueOnce("MOCK_TEST_VARIABLE=foo,bar\nAVAILABLE_OPTIONS=foo,baz");
    
        loadConfig();
    
        expect(process).toHaveProperty('env');
        expect(process.env.MOCK_TEST_VARIABLE).toBeDefined();
        expect(process.env.AVAILABLE_OPTIONS).toBeDefined();
        expect(process.env.UNDEFINED_VARIABLE).toBeUndefined();
    });
})

describe('Load config errors', () => {
    test('Should send an error in console if env file do not exists', () => {
        const { loadConfig } = require('../../services/config.service');
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    
        fs.existsSync.mockReturnValueOnce(false);
    
        expect(() => loadConfig()).toThrow('process.exit');
        expect(consoleLogSpy).toHaveBeenCalled();
        expect(processExitSpy).toHaveBeenCalled();
    });
    
    test('Should send an error in console if variable do not exists', () => {
        const { loadConfig, getFromConfig } = require('../../services/config.service');
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    
        fs.readFileSync.mockReturnValueOnce("MOCK_TEST_VARIABLE=foo,bar\nAVAILABLE_OPTIONS=foo,baz");
        fs.existsSync.mockReturnValueOnce(true);
    
        loadConfig();
    
        expect(() => getFromConfig('UNDEFINED_VARIABLE')).toThrow('process.exit');
    });
})