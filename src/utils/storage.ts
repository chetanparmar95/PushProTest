import AsyncStorage from '@react-native-community/async-storage';
import {NFTData} from '../feature/home/redux/slice';

// Load bookmarks from local storage
const loadBookmarks = async () => {
  const storedBookmarks = await AsyncStorage.getItem('bookmarks');
  if (storedBookmarks) {
    return JSON.parse(storedBookmarks);
  }
  return [];
};

const storeBookmarks = (bookmarks: NFTData[]) => {
  AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
};

export {loadBookmarks, storeBookmarks};
