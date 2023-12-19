import {MMKV} from 'react-native-mmkv';
import {STORAGE_ENCRYPT_KEY} from '@env';

export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: STORAGE_ENCRYPT_KEY,
});
