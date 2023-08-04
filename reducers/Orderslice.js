import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
const initialState = {
  userOrders: [],
  ordersLoading: false,
};

export const CreateOrder = createAsyncThunk(
  "orderslice/createorder",
  async (user, { rejectWithValue, fulfillWithValue }) => {
    console.log("item", user);
    try {
      const docref = doc(db, "orders", user.uid);
      await setDoc(
        docref,
        {
          email: user.email,
          uid: user.uid,
          orders: arrayUnion({ ...user.item, time: Timestamp.now() }),
        },
        { merge: true }
      );
      return fulfillWithValue("Success");
    } catch (e) {
      console.log(e);
      return rejectWithValue("Something Went Wrong");
    }
  }
);
export const getOrders = createAsyncThunk(
  "orderslice/getorders",
  async (user, { rejectWithValue, fulfillWithValue }) => {
    try {
      const docref = doc(db, "orders", user.uid);
      let orders = [];
      const docsnap = await getDoc(docref);
      if (docsnap.exists()) {
        for (const order in docsnap.data().orders) {
          orders.push({
            ...docsnap.data().orders[order],
            id: order,
            time: docsnap.data().orders[order].time.toDate().getTime(),
          });
        }
        console.log(orders);
        return fulfillWithValue(orders);
      } else {
        throw rejectWithValue("No Orders");
      }
    } catch (e) {
      throw rejectWithValue("No Orders");
    }
  }
);
const OrderSlice = createSlice({
  name: "orderslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state, action) => {
      console.log(action.payload);
      state.ordersLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      console.log("pay", action.payload);
      state.userOrders = [...action.payload];
      state.ordersLoading = false;
    });
    builder.addCase(getOrders.rejected, (state, action) => {
      state.ordersLoading = false;
    });
    builder.addCase(CreateOrder.pending, (state, action) => {
      console.log(action.payload);
      state.ordersLoading = true;
    });
    builder.addCase(CreateOrder.fulfilled, (state, action) => {
      state.ordersLoading = false;
    });
    builder.addCase(CreateOrder.rejected, (state, action) => {
      state.ordersLoading = false;
    });
  },
});

export default OrderSlice.reducer;
