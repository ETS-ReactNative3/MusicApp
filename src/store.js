import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware ,compose,combineReducers} from 'redux';
import {persistReducer,persistStore} from 'redux-persist';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import AppReducer from './redux/reducers/AppReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const AppReducers = combineReducers({AppReducer});

const rootReducer = (state, action) => {
    return AppReducers(state, action);
}
 
const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['AppReducer'],
    stateReconcilor:hardSet
}

const store = createStore(
  persistReducer(rootPersistConfig, rootReducer),
  compose(applyMiddleware(thunk, logger)),
);

const persistor = persistStore(store);

export { store, persistor };