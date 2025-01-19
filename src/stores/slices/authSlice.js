import { storage_keys } from "@/constants/storage-keys";
import { authService } from "@/services/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLoginAccount = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await authService.login(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRegisterAccount = createAsyncThunk(
  "auth/register",
  async (body, { rejectWithValue }) => {
    try {
      const response = await authService.register(body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem(storage_keys.ACCESS_TOKEN) || null,
    refreshToken: localStorage.getItem(storage_keys.REFRESH_TOKEN) || null,
    profile: JSON.stringify(storage_keys.PROFILE) || null,
  },
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.profile = null;
      localStorage.removeItem(storage_keys.PROFILE);
      localStorage.removeItem(storage_keys.ACCESS_TOKEN);
      localStorage.removeItem(storage_keys.REFRESH_TOKEN);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginAccount.fulfilled, (state, action) => {
      const payload = action.payload;
      const { name, imageUrl } = payload.user;
      const { accessToken, refreshToken } = payload.tokens;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.profile = { name, imageUrl };
      localStorage.setItem(storage_keys.PROFILE, { name, imageUrl });
      localStorage.setItem(storage_keys.ACCESS_TOKEN, accessToken);
      localStorage.setItem(storage_keys.REFRESH_TOKEN, refreshToken);
    });
    builder.addCase(fetchRegisterAccount.fulfilled, (state, action) => {
      const payload = action.payload;
      const { name, imageUrl } = payload.user;
      const { accessToken, refreshToken } = payload.tokens;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.profile = { name, imageUrl };
      localStorage.setItem(storage_keys.PROFILE, { name, imageUrl });
      localStorage.setItem(storage_keys.ACCESS_TOKEN, accessToken);
      localStorage.setItem(storage_keys.REFRESH_TOKEN, refreshToken);
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;
export default authSlice.reducer;
