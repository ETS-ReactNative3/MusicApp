import React from 'react';
import { Provider } from 'react-redux';
import  { persistor,store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import AppContainer from './src/AppContainer';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
          </PersistGate>
      </Provider>
    </>
  );
}
