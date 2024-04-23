// sagas.ts
import { call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { setLocationInfo } from "../reducers/locationSlice";
import { GOOGLE_MAP_API } from "../../shared/config/secrets";

const key = GOOGLE_MAP_API;

interface AddressComponent {
  types: string[];
  long_name: string;
}

interface GeoCodingResponse {
  data: {
    results: {
      address_components: AddressComponent[];
    }[];
  };
}

function* fetchLocationInfo(action: { type: string; payload: any }) {
  try {
    const {lat,lng} = action.payload;
    const response: AxiosResponse<GeoCodingResponse> = yield call(
      axios.get,
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
    );
    const data = response.data;
    yield put(setLocationInfo(data));
    
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

function* currentLocationSaga() {
  yield takeEvery("location/fetchLocationInfo", fetchLocationInfo);
}

export default currentLocationSaga;
