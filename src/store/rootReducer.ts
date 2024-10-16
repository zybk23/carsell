import { combineReducers } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

const createReducer = combineReducers({
  productSlice,
});

export default createReducer;
