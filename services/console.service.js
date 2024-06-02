/**
 * Send an error message to the console and halt the process.
 * 
 * @param { string } message
 */
function error(message) {
    console.log(`\x1b[31m[ERROR]\x1b[37m ${message}`);
    process.exit();
}

module.exports = {
    error
}