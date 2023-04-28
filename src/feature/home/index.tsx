import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NFTView from '../../components/NFTView';
import {RootState} from '../../store';
import {getNFTs} from './redux/slice';

type Props = {};

const Home: React.FC<Props> = ({}) => {
  const nfts = useSelector((state: RootState) => state.nft.nfts);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getNFTs({}));
  }, []);

  // console.log('nfts', nfts);

  const renderUserItem = ({item}: any) => {
    return <NFTView data={item} bookmark={false} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={nfts}
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
export default Home;
