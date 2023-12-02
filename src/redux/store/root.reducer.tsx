import {combineReducers} from 'redux';
import productSlice from '../slices/product.slice';

export const rootReducer = combineReducers({
  product: productSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
