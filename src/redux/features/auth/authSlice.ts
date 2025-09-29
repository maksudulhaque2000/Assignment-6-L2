import { createSlice } from '@reduxjs/toolkit';

type TUser = {
  _id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver' | 'admin';
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: TAuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: TAuthState }) => state.auth.token;