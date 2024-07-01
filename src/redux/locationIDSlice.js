import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  locationId: 1, 
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocationId: (state, action) => {
      state.locationId = action.payload;
    }
  },
});

export const {setLocationId, setLocationData} = locationsSlice.actions;
export default locationsSlice.reducer;
