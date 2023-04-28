import {combineReducers} from 'redux';
import nftReducer from '../feature/home/redux/slice';

export default combineReducers({
  nft: nftReducer,
});
