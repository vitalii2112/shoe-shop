import '@testing-library/react-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import 'jest-styled-components';
import {jest} from "@jest/globals";

beforeEach(() => {
    jest.useFakeTimers()
})

// jest.mock('react-native/Libraries/Utilities/Dimensions', () => {
//     return {
//         width: 360,
//         height: 720
//     }
// })

// jest.mock('@env', () => {
//     return {
//         API_URL: '',
//         STORAGE_ENCRYPT_KEY: ''
//     }
// })

// jest.mock('react-native-reanimated', () => {
//     const Reanimated = require('react-native-reanimated/mock');
//
//     Reanimated.default.call = () => {};
//
//     return Reanimated;
// });

jest.mock('validator/es/lib/isEmail', () => {
    return jest.fn()
})

jest.mock('react-native-document-picker', () => ({
    DocumentPicker: {
        pick: jest.fn(),
    },
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
