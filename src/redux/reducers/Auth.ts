import { createSelector, createSlice } from "@reduxjs/toolkit";

import { Auth } from "../../types/Auth";
import { RootState } from "../store";

const initialState: Auth = {
  user: null
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

const { actions, reducer } = AuthSlice;

export const {
  setUser, reset 
} = actions;

export const AuthSelector = (state: RootState) => state.auth;
export const UserSelector = createSelector(AuthSelector, (state) => state.user);

export default reducer;