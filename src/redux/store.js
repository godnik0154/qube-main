import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
    key: 'root',
    storage
}

const rootPersistReducer = persistReducer(rootPersistConfig,rootReducer);

const store = createStore(rootPersistReducer,applyMiddleware());

const persistor = persistStore(store);
export {store,persistor}