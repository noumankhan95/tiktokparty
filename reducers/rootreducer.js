import { combineReducers } from "redux";
import authslice from "./authslice";
import paymentSlice from "./paymentslice";
import Orderslice from "./Orderslice";
const rootreducer = combineReducers({
  auth: authslice,
  payment: paymentSlice,
  order: Orderslice,
});

export default rootreducer;
