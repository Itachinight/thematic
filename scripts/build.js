const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

// const {writeFile} = require('fs');
// writeFile('./default.json', JSON.stringify(config), () => console.log('default saved'));

config.optimization.splitChunks = {
    cacheGroups: {
        default: false
    }
};

config.devtool = 'hidden-source-map';
config.optimization.runtimeChunk = false;
config.output.filename = 'static/js/thematic.js';
config.plugins[5].options.filename = 'static/css/thematic.css';