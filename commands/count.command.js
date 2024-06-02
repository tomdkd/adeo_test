
/**
 * Run a counting operation on each element and append the count to their name. 
 * If an element contains an attribute detected as an array, the operation will be recursive.
 * 
 * @param { object[] } data 
 * @returns { object[] }
 */
function count(data) {
    const updatedData = [...data];

    updatedData.forEach((line) => {
        const keys = Object.keys(line);
        const arrayKey = keys.find((key) => {
            return Array.isArray(line[key]);
        });

        if (arrayKey) {
            const element = line[arrayKey];

            if (line.name) {
                line.name = `${line.name} [${element.length}]`;
            }

            count(element);
        }
    });

    return updatedData;
}

module.exports = {
    count
}