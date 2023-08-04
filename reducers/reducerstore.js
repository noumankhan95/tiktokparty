import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./rootreducer";
const store = configureStore({
  reducer: rootreducer,
});

export default store;
