import {AxiosResponse} from 'axios';
import {getProducts, getSingleProduct} from '../../service/api';
import {put, takeEvery} from 'redux-saga/effects';
import productSlice from '../slices/product.slice';

function* getAllProducts() {
  try {
    const response: AxiosResponse = yield getProducts();
    yield put(productSlice.actions.setAllProducts(response.data.products));
  } catch (error) {}
}

function* getProduct(action: any) {
  try {
    const response: AxiosResponse = yield getSingleProduct(action.payload);
    yield put(productSlice.actions.setProduct(response.data));
  } catch (error) {}
}

export function* productSaga() {
  yield takeEvery('product/getAllProducts', getAllProducts);
  yield takeEvery('product/getProduct', getProduct);
}
