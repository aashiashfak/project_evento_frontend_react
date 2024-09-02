import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import locationsReducer from "./locationIDSlice";
import wishlistReducer from "./WishListSlice";

const rootReducer = combineReducers({
  user: userReducer,
  locations: locationsReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: "root",
  storage,
};



const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
