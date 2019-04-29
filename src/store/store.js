import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Platform } from 'react-native'

import rootReducer from '../reducer'
import rootSaga from '../saga/saga'

const persistConfig = {
    key: 'root',
    storage,
    timeout: 0
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const configureStore = createStore(
    persistedReducer,
    (Platform.OS == "android")
    ? composeWithDevTools(applyMiddleware(sagaMiddleware))
    : compose(
        applyMiddleware(sagaMiddleware),
        reduxDevTools
    )
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(configureStore);
// persistor.purge();