import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducers from './reducers';
import rootSagas from './effects';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth'],
  blacklist: [],
  transforms: [],
};

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, thunkMiddleware, routerMiddleware(history)];

const persistReducers = persistReducer(persistConfig, rootReducers(history));

export const store = createStore(
  persistReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);
