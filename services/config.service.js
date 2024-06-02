const fs = require('fs');
const path = require('path');
const { error } = require('./console.service');

/**
 * Set environment variables defined in the env file into the process.env object..
 */
function loadConfig() {
    const envPath = path.resolve('.env');
    
    if (!fs.existsSync(envPath)) {
        error(`Env file don't exists in ${envPath}`);
    }

    const variables = fs.readFileSync(envPath, 'utf-8').split('\n');

    for (let i = 0; i <= (variables.length -1); i++) {
        const [key, value] = variables[i].split('=');
        process.env[key.trim()] = value.trim();
    }
}

/**
 * Get a value by its key from environment variables.
 * 
 * @param { string } key 
 * @returns { string | never }
 */
function getFromConfig(key) {
    return process.env[key] ?? error(`Parameter ${key} do not exists`);
}

module.exports = {
    loadConfig,
    getFromConfig
}