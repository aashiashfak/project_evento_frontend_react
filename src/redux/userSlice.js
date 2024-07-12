import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: null,
  accessToken: null,
  refreshToken: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearUser: (state) => {
      state.username = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const {setUser, clearUser, setUsername} = userSlice.actions;
export default userSlice.reducer;
