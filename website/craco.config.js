const path = require('path');
const CracoEnvPlugin = require('craco-plugin-env')
const {pathsToModuleNameMapper} = require("ts-jest");
const {compilerOptions} = require('./tsconfig.path.json')
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
    ],
    jest: {
        configure: {
            preset: 'ts-jest',
            moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
                prefix: '<rootDir>/src/',
            }),
            setupFilesAfterEnv: [
                "<rootDir>/src/setupTests.js"
            ],
        },
    },
};
