const { error } = require('./console.service');
const { getFromConfig } = require('./config.service');

/**
 * Return the option passed by the user without the '--' prefix and 
 * check if this option is among the available options defined in the env file. 
 * If the option is unknown, return an error
 * 
 * @returns { { name: string, value: string } || never }
 */
function getOption() {
    const validOptions = getFromConfig('AVAILABLE_COMMANDS').split(',');
    const args = process.argv.slice(2);

    if (args.length === 0) {
        error('No option provided. Please provide an option.');
    }

    const option = __parseOption(args[0]);

    if (!validOptions.includes(option.name)) {
        const errorMessage = `"${option.name}" is not a valid option. Expect [ ${validOptions.join(', ')} ]`;
        error(errorMessage);
    }

    return option;
}

/**
 * Verify if the passed option is correct and validate the 'filter' option for its accuracy.
 * 
 * @param { string } arg 
 * @returns 
 */
function __parseOption(arg) {
    const [name, value] = arg.startsWith('--') ? arg.substring(2).split('=') : error(`"${arg}" is not an option`);

    if (name === 'filter' && (value === undefined || value === '')) {
        error(`Value cannot be null or undefined for option "filter". Usage: node index.js --filter=py.`);
    }

    return { name, value };
}

module.exports = {
    getOption
}