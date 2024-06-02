test('Should send an error message formatted', () => {
    const { error } = require('../../services/console.service');
    const processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => { throw new Error(`process.exit`); });
    const consoleLogSpy = jest.spyOn(console, 'log');
    const message = 'It is a fake error message';
    const expectedMessage = `\x1b[31m[ERROR]\x1b[37m ${message}`;

    expect(() => error(message)).toThrow('process.exit');
    expect(consoleLogSpy).toHaveBeenCalledWith(expectedMessage);
})