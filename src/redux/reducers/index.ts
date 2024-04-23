import autoCompleteReducer from "./autoCompleteSlice";
import locationReducer from "./locationSlice";
import userReducer from "./userSlice";

const rootReducers = {
  autocomplete: autoCompleteReducer,
  location: locationReducer,
  user: userReducer,
};

export default rootReducers;
