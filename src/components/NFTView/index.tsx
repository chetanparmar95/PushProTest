import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import config from '../../config';
import {
  deleteBookmarks,
  getImage,
  handleBookmarks,
  NFTData,
} from '../../feature/home/redux/slice';
import {RootState} from '../../store';
import {PRIMARY_COLOR} from '../../utils/colors';
import {storeBookmarks} from '../../utils/storage';

const save1 = require('./../../assets/save1.png');
const save2 = require('./../../assets/save2.png');
const _delete = require('./../../assets/delete.png');

type Props = {
  data: NFTData;
  bookmark: boolean;
};

const NFTView: React.FC<Props> = ({data, bookmark}) => {
  const {name, token_address, token_id, token_uri} = data;
  const dispatch = useDispatch();
  const {images, bookmarked} = useSelector((state: RootState) => state.nft);

  React.useEffect(() => {
    if (token_uri.includes('https://ipfs.moralis.io')) {
      dispatch(getImage({id: token_id, url: token_uri}));
    }
  }, []);

  React.useEffect(() => {
    storeBookmarks(bookmarked);
  }, [bookmarked]);

  const onBookmark = () => {
    dispatch(handleBookmarks(data));
  };

  const deleteBookmark = () => {
    dispatch(deleteBookmarks(data));
  };

  return (
    <TouchableOpacity style={styles.mainCardView} activeOpacity={0.8}>
      <Image
        source={{
          uri: images[token_id] || config.defaultImage,
        }}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tokenId}>Token ID:{token_id}</Text>
        <Text style={styles.tokenAddress} numberOfLines={1}>
          {token_address}
        </Text>
      </View>
      <View style={styles.bookmarkContainer}>
        {bookmark ? (
          <TouchableOpacity style={styles.bookmark} onPress={deleteBookmark}>
            <Image source={_delete} tintColor={PRIMARY_COLOR} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bookmark} onPress={onBookmark}>
            <Image
              source={
                bookmarked.some(b => b.token_id === token_id) ? save2 : save1
              }
              tintColor={PRIMARY_COLOR}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    marginVertical: 4,
    alignItems: 'center',
  },
  mainCardView: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.shadow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 8,
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  infoContainer: {
    margin: 8,
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 16,
    color: Colors.black,
  },
  tokenId: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '100',
  },
  tokenAddress: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    flex: 1,
  },
  bookmarkContainer: {
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  bookmark: {
    padding: 8,
  },
});

export default NFTView;
