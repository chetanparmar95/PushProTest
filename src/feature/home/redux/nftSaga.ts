import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import NFTServices from '../../../services/NFTServices';
import {getImage, getNFTs, setImage, setNFTs} from './slice';

export function* fetchNFTsSaga(): Generator<any> {
  try {
    const response: any = yield call(NFTServices.getNFTContracts);
    yield put(setNFTs(response.data.result));
  } catch (error) {
    console.log(error);
  }
}

export function* fetchNFTImage(action: any): Generator<any> {
  try {
    const response: any = yield call(
      NFTServices.getNFTImage,
      action.payload.url,
    );
    yield put(setImage({id: action.payload.id, image: response.data.image}));
  } catch (error) {
    console.log(error);
  }
}

function* nftSaga() {
  yield takeLatest(getNFTs.type, fetchNFTsSaga);
  yield takeEvery(getImage.type, fetchNFTImage);
}

export default nftSaga;
