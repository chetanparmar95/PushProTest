import {all} from 'redux-saga/effects';
import nftSaga from '../feature/home/redux/nftSaga';

function* rootSaga() {
  yield all([nftSaga()]);
}

export default rootSaga;
