import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NFTView from '../../components/NFTView';
import {RootState} from '../../store';
import {loadBookmarks} from '../../utils/storage';
import {setBookmarks} from '../home/redux/slice';

type Props = {};

const Bookmark: React.FC<Props> = ({}) => {
  const bookmarked = useSelector((state: RootState) => state.nft.bookmarked);
  const dispatch = useDispatch();
  React.useEffect(() => {
    loadBookmarks().then(b => {
      dispatch(setBookmarks(b));
    });
  }, []);

  const renderUserItem = ({item}: any) => {
    return <NFTView data={item} bookmark={true} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarked}
        keyExtractor={key => key.token_id.toString()}
        renderItem={renderUserItem}
        style={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 8,
  },
});
export default Bookmark;
