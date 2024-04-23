// sagas.ts
import { all, call, put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { setLocationInfo } from "../reducers/locationSlice";

interface GeoLocation {
  lat: number;
  lng: number;
}

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

function* fetchLocationInfo(): Generator<any, void, AxiosResponse> {
  try {
    const geoResponse: AxiosResponse<GeoLocation> = yield call(
      axios.get,
      "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBixN5IBXtPnTwZAnJo_o5RqzH00PUyU7A"
    );
    const { lat, lng } = geoResponse.data;

    const geoCodingResponse: AxiosResponse<GeoCodingResponse> = yield call(
      axios.get,
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBixN5IBXtPnTwZAnJo_o5RqzH00PUyU7A`
    );
    const { results } = geoCodingResponse.data.data;

    if (results.length > 0) {
      const addressComponents = results[0].address_components;
      const city = addressComponents.find((component) =>
        component.types.includes("locality")
      );
      const country = addressComponents.find((component) =>
        component.types.includes("country")
      );

      yield put(
        setLocationInfo({
          city: city ? city.long_name : "Unknown",
          country: country ? country.long_name : "Unknown",
          lat,
          lng,
        })
      );
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  }
}

function* currentLocationSaga() {
  yield takeEvery("location/fetchLocation", fetchLocationInfo);
}

export default currentLocationSaga;
