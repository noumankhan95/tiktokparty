import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const initialState = {
  user: { uid: "", username: "", email: "", profileUrl: "", coins: 0 },
  isAuthenticated: false,
  isloading: false,
  isError: false,
  error: "",
};
export const logintoAccount = createAsyncThunk(
  "authslice/logintoAccount",
  async (credentials, { rejectWithValue, fulfillWithValue }) => {
    const { email, password } = credentials;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = {
        email: userCredential.user.email,
        profileUrl: "",
        uid: userCredential.user.uid,
        coins: 0,
      };
      return fulfillWithValue(user);
    } catch (e) {
      if (e.code === "auth/user-not-found") {
        throw rejectWithValue("No Email Account Found");
      } else if (
        e.code === "auth/wrong-password" ||
        e.code === "auth/invalid-email"
      ) {
        throw rejectWithValue("Email or Password Incorrect");
      } else {
        throw rejectWithValue("Something Went Wrong");
      }
    }
  }
);
export const createAccount = createAsyncThunk(
  "authslice/createAccount",
  async (credentials, { rejectWithValue, fulfillWithValue }) => {
    const { email, password, name } = credentials;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = {
        email: userCredential.user.email,
        profileUrl: "",
        coins: 0,
        name,
        uid: userCredential.user.uid,
        username: "",
        defaultCard: "",
      };
      const userref = doc(db, "users", userCredential.user.uid);
      await setDoc(userref, user);
      return fulfillWithValue(userCredential.user.toJSON());
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-email":
          throw rejectWithValue("Enter Correct Email And Password");
        case "auth/email-already-in-use":
          throw rejectWithValue(
            "Account Exists Already.Please Try Another Account"
          );
        case "auth/wrong-password":
          throw rejectWithValue("Enter Correct Email And Password");
        default:
          throw rejectWithValue("Something Went Wrong");
      }
    }
  }
);
export const logOut = createAsyncThunk(
  "authslice/logUserOut",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      await signOut(auth);

      return fulfillWithValue("Signed Out");
    } catch (e) {
      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const DeductCoins = createAsyncThunk(
  "authslice/deductcoins",
  async (u, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { user } = state.auth;
      if (user.uid !== u.uid) throw "SomeThing Went Wrong";
      const lcoins = user.coins < u.coins ? 0 : user.coins - u.coins;
      await setDoc(doc(db, "users", u.uid), { coins: lcoins }, { merge: true });
      return fulfillWithValue({ coins: u.coins });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
export const AddCoins = createAsyncThunk(
  "authslice/addcoins",
  async (u, { fulfillWithValue, rejectWithValue, getState }) => {
    console.log("u " + u);
    try {
      console.log("u " + u);
      const state = getState();
      const { user } = state.auth;
      if (user.uid !== u.uid) throw "SomeThing Went Wrong";
      await setDoc(
        doc(db, "users", u.uid),
        { coins: parseInt(u.coins) + user.coins },
        { merge: true }
      );
      return fulfillWithValue({ coins: u.coins });
    } catch (e) {
      console.log(e);
      return rejectWithValue(e);
    }
  }
);
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logUserIn(state, action) {
      console.log(action.payload);
      state.user.uid = action.payload.uid;
      state.user.coins = action.payload.coins;
      state.user.email = action.payload.email;
      state.user.profileUrl = action.payload.profileUrl;
      state.user.username = action.payload.username || action.payload.name;
      state.isAuthenticated = true;
    },
    logUserOut(state, action) {
      state.isAuthenticated = false;
    },
    changeprofileUrl(state, action) {
      state.user.profileUrl = action.payload.profileUrl;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logintoAccount.pending, (state) => {
      console.log("case pending");
      state.isloading = true;
    });
    builder.addCase(logintoAccount.fulfilled, (state, action) => {
      console.log("payload", action.payload);
      state.user.email = action.payload.email;
      state.user.uid = action.payload.uid;
      state.isloading = false;
      state.isAuthenticated = true;
      // AsyncStorage.setItem("user", JSON.stringify(action.payload.email));
    });
    builder.addCase(logintoAccount.rejected, (state, action) => {
      console.log("case reject", action);
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(createAccount.pending, (state) => {
      console.log("case pending");
      state.isloading = true;
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      console.log("case full");
      state.isloading = false;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      console.log("case reject");
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(logOut.pending, (state) => {
      console.log("case pending");
      state.isloading = true;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      console.log("case full");
      // AsyncStorage.removeItem("user", () => {
      //   console.log("logged out");
      // });
      state.isloading = false;
      state.isAuthenticated = false;
    });
    builder.addCase(logOut.rejected, (state, action) => {
      console.log("case reject");
      state.isloading = false;
      state.isError = true;
    });
    builder.addCase(DeductCoins.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(DeductCoins.rejected, (state, action) => {
      state.isloading = false;
    });
    builder.addCase(DeductCoins.fulfilled, (state, action) => {
      console.log("deduct fulfill", action.payload);
      if ((state.user.coins -= action.payload.coins) <= 0) {
        state.user.coins = 0;
      } else {
        state.user.coins -= action.payload.coins;
      }
      state.isloading = false;
    });
    builder.addCase(AddCoins.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(AddCoins.rejected, (state, action) => {
      state.isloading = false;
    });
    builder.addCase(AddCoins.fulfilled, (state, action) => {
      console.log("fulfill", action.payload);
      state.user.coins += parseInt(action.payload.coins);
      state.isloading = false;
    });
  },
});
export const {
  logUserIn,
  logUserOut,
  changeprofileUrl,
  setloadingFalse,
  setloadingTrue,
} = authSlice.actions;
export default authSlice.reducer;
