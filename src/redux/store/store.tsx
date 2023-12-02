import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {rootReducer} from './root.reducer';
import {rootSaga} from './root.saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export {store};
