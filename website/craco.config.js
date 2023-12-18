const path = require('path');
const CracoEnvPlugin = require('craco-plugin-env')
module.exports = {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    plugins: [
        {
            plugin: CracoEnvPlugin,
            options: {
                variables: {},
                envDir: './'
            }
        }
    ]
};
