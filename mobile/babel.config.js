module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        ['@babel/preset-env', { targets: { node: 'current' } }],
    ],
    plugins: [
        // "babel-plugin-styled-components",
        ['module:react-native-dotenv', {
            'moduleName': '@env',
            'path': '.env',
            'blacklist': null,
            'whitelist': null,
            'safe': false,
            'allowUndefined': true,
            'verbose': false
        }],
    ],
};
