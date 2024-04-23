import { createSlice } from "@reduxjs/toolkit";
import { ErrorType } from "../../shared/interfaces/error";

interface State {
  user: User | null;
  profiles: IUserData[] | null;
  isLoading: boolean;
  error: ErrorType | null;
  profileDetail: IUserData | undefined;
}

const initialState: State = {
  user: null,
  profiles: null,
  profileDetail: undefined,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload;
      state.isLoading = false;
    },
    setProfileDetail: (state, action) => {
      state.profileDetail = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    getProfileDetail: (state, action) => {
      console.log("state.profile : ", state.profiles);
      state.profileDetail = state.profiles?.filter(
        (ele) => ele._id == action.payload
      )[0];
    },
    registerUser: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    },
    loginUser: (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    },
    fetchProfiles: (state, action) => {
      state.isLoading = true;
    },
    updateProfileDetail: (state, action) => {
      state.isLoading = true;
    },
  },
});

export const {
  setUser,
  setProfiles,
  setProfileDetail,
  setLoading,
  setError,
  clearError,
  registerUser,
  loginUser,
  fetchProfiles,
  updateProfileDetail,
  getProfileDetail,
} = userSlice.actions;

export default userSlice.reducer;
