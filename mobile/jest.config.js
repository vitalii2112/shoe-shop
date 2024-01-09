module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
    preset: 'react-native',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.js?$': 'babel-jest',
    },
    globals: {
        __DEV__: true,
        DEV: true,
        dev: true,
        __dev__:true
    },
    moduleNameMapper: {
        '^@env$': '<rootDir>/__mocks__/@env.ts',
        "\\.svg": "<rootDir>/__mocks__/svgMock.ts"
    },
    transformIgnorePatterns: [
        '<rootDir>/node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation|styled-components/native|react-redux|validator)'
    ],
};
