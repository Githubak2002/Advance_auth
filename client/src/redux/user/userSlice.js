import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error:false,
  loading:false,
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    signInStart:(state,action) => {
      state.loading = true;
    },
    signInSuccess:(state,action) => {
      state.currentUser = action.payload;
      state.error = false;
      state.loading= false;
    },
    signInFailed:(state,action) => {
      state.error = action.payload;
      state.loading= false;
    },
    signOut:(state,action) => {
      state.currentUser = null;
      state.error = false;
      state.loading= false;
    },
  }
});

export const {signInFailed, signInSuccess, signInStart, signOut} = userSlice.actions;

export default userSlice.reducer;
