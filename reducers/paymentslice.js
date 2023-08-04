import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
const initialState = {
  defaultCard: "4224455423232323",
  cardExists: true,
  cards: [],
  isloadingcard: false,
};

export const createNewCard = createAsyncThunk(
  "paymentslice/addCard",
  async (args, { fulfillWithValue, rejectWithValue }) => {
    console.log("args", args);
    try {
      await setDoc(
        doc(db, "users", args.uid),
        {
          cards: arrayUnion({
            cardnumber: args.cardnumber,
            month: args.month,
            year: args.year,
          }),
        },
        { merge: true }
      );
      return fulfillWithValue(args);
    } catch (e) {
      return rejectWithValue("Couldnt Complete Your Request,Try After A While");
    }
  }
);

export const removeCard = createAsyncThunk(
  "paymentslice/removecard",
  async (args, { fulfillWithValue, rejectWithValue }) => {
    try {
      await setDoc(
        doc(db, "users", args.uid),
        {
          cards: arrayRemove({
            cardnumber: args.cardnumber,
            month: args.month,
            year: args.year,
          }),
        },
        { merge: true }
      );
      return fulfillWithValue(args);
    } catch (e) {
      return rejectWithValue("Couldnt Complete Your Request,Try After A While");
    }
  }
);
export const createnewDefault = createAsyncThunk(
  "paymentslice/createnewDefault",
  async (args, { fulfillWithValue, rejectWithValue }) => {
    try {
      await setDoc(
        doc(db, "users", args.uid),
        {
          defaultCard: args.cardnumber,
        },
        { merge: true }
      );
      return fulfillWithValue(args);
    } catch (e) {
      return rejectWithValue("Couldnt Complete Your Request,Try After A While");
    }
  }
);

const paymentSlice = createSlice({
  name: "paymentslice",
  initialState,
  reducers: {
    addCards(state, action) {
      if (action.payload.cards.length > 0) {
        state.cardExists = true;
        for (let i = 0; i < action.payload.cards.length; i++) {
          console.log("cardsnew", action.payload.cards[i]);
          state.cards.push({ ...action.payload.cards[i], id: i });
        }
        console.log("pushed", state.cards);
        state.defaultCard =
          action.payload.defaultCard || state.cards[0].cardnumber;
      } else {
        state.cards = action.payload.cards;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCard.pending, (state, action) => {
      state.isloadingcard = true;
    });
    builder.addCase(createNewCard.rejected, (state, action) => {
      if (state.cards.length <= 0) {
        state.cardExists = false;
      }
      state.isloadingcard = false;
    });
    builder.addCase(createNewCard.fulfilled, (state, action) => {
      console.log("builder", action.payload);
      state.cards.push({
        cardnumber: action.payload.cardnumber,
        month: action.payload.month,
        year: action.payload.year,
      });
      state.cardExists = true;
      state.isloadingcard = false;
    });
    builder.addCase(removeCard.pending, (state, action) => {
      state.isloadingcard = true;
    });
    builder.addCase(removeCard.rejected, (state, action) => {
      if (state.cards.length <= 0) {
        state.cardExists = false;
      }
      state.isloadingcard = false;
    });
    builder.addCase(removeCard.fulfilled, (state, action) => {
      state.cards = state.cards.filter(
        (i) => i.cardnumber !== action.payload.cardnumber
      );
      state.cardExists = true;
      state.isloadingcard = false;
    });
    builder.addCase(createnewDefault.pending, (state, action) => {
      state.isloadingcard = true;
    });
    builder.addCase(createnewDefault.rejected, (state, action) => {
      state.isloadingcard = false;
    });
    builder.addCase(createnewDefault.fulfilled, (state, action) => {
      console.log("here", action.payload);
      state.defaultCard = action.payload.cardnumber;
      state.isloadingcard = false;
    });
  },
});
export const { addCards } = paymentSlice.actions;
export default paymentSlice.reducer;
