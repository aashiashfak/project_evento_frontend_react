import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: null,
  accessToken: null,
  refreshToken: null,
  role: null,
  profilePicture: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || null;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
      state.profilePicture = action.payload.profilePicture;
    },
    clearUser: (state) => {
      state.username = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.profilePicture = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const {setUser, clearUser, setUsername} = userSlice.actions;
export default userSlice.reducer;
