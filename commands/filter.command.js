/**
 * Filter an array of objects. 
 * This function will accept a pattern to check animal names and return only the elements whose names match the pattern.
 * The structure of data should be like : 
 * [{
 *  "name": "countryname",
 *  "people": [{
 *          "name": "peoplename",
 *          "animal": [
 *              {
 *                  "name": "animalname"
 *              }
 *          ]
 *      }]
 * }]
 * 
 * @param { object[] } data 
 * @param { string } pattern 
 * @returns { object[] }
 */
function filter(data, pattern) {
    const updatedData = data.map((country) => {
        const filteredPeople = country.people.map((person) => {
            const filteredAnimals = person.animals.filter((animal) => animal.name.toLowerCase().includes(pattern.toLowerCase()));
            return {
                name: person.name,
                animals: filteredAnimals
            };
        }).filter((person) => person.animals.length > 0);

        return {
            name: country.name,
            people: filteredPeople
        };
    }).filter((country) => country.people.length > 0);

    return updatedData;
}

module.exports = {
    filter
};
