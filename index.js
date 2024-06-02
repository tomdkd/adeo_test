const { loadConfig } = require('./services/config.service');
const { getOption } = require('./services/options.service');
const { count } = require('./commands/count.command');
const { filter } = require('./commands/filter.command');
const { data } = require('./data');
const fs = require('fs');

loadConfig();

const option = getOption();

switch (option.name) {
    case 'count':
        console.log(count(data));
        break;
    case 'filter':
        console.log(filter(data, option.value));
        break;
}