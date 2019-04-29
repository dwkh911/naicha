import {AppRegistry} from 'react-native';
import React from 'react'
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore, persistor } from "./src/store/store"

const naichaRedux = () => (
    <Provider store={configureStore}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => naichaRedux);
