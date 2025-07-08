const { loadConfig } = require('./services/config.service');
const { getOption } = require('./services/options.service');
const { count } = require('./commands/count.command');
const { filter } = require('./commands/filter.command');
const { data } = require('./data');

loadConfig();

const option = getOption();

switch (option.name) {
    case 'count':
        console.log(JSON.stringify(count(data), null, 2));
        break;
    case 'filter':
        console.log(JSON.stringify(filter(data, option.value), null, 2));
        break;
}