import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  setOptions,
  setLoading,
  setError,
} from "../reducers/autoCompleteSlice";

interface FetchOptionsAction {
  type: string;
  payload: string;
}

function* fetchAutocompleteOptions(action: FetchOptionsAction) {
  try {
    yield put(setLoading(true));
    const response: AxiosResponse = yield call(
      axios.get,
      `https://nominatim.openstreetmap.org/search?q=${action.payload}&format=json&addressdetails=1`
    );
    yield put(setOptions(response.data));
  } catch (error) {
    yield put(setError((error as Error).message)); // Type assertion
  } finally {
    yield put(setLoading(false));
  }
}

function* autocompleteSaga() {
  yield takeLatest("autocomplete/fetchOptions", fetchAutocompleteOptions);
}

export default autocompleteSaga;
