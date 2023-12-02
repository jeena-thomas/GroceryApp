import {all} from 'redux-saga/effects';
import {productSaga} from '../sagas/product.saga';

function* rootSaga() {
  yield all([productSaga()]);
}

export {rootSaga};
