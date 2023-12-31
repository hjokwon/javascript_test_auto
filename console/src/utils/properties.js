const config = require('config');

global.testIds = config.get('id');
global.mainId = config.get('main_id');
global.name = config.get('name');