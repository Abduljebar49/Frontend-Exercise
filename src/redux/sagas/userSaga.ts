// userSaga.ts

import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  setUser,
  setLoading,
  setError,
  setProfiles,
  setProfileDetail,
} from "../reducers/userSlice";
import { baseURL } from "../../shared/config/constants";

function* updateProfileDetail(action: { type: string; payload: any }) {
  try {
    yield put(setLoading(true));
    const user: User = JSON.parse(localStorage.getItem("user-data")!);
    const { _id } = action.payload;

    const response: AxiosResponse = yield call(
      axios.put,
      `${baseURL}/profle?id=${_id}`,
      action.payload,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const profiles = response.data;
    yield put(setProfileDetail(profiles));
  } catch (error) {
    const temp = error as AxiosError;
    yield put(
      setError(temp.response ? temp.response?.data : { message: temp.message })
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* fetchProfiles(action: { type: string; payload: any }) {
  try {
    yield put(setLoading(true));
    const user: User = JSON.parse(localStorage.getItem("user-data")!);
    const response: AxiosResponse = yield call(
      axios.get,
      `${baseURL}/fetch/dummy/user-v2?${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const profiles = response.data.data;
    yield put(setProfiles(profiles));
  } catch (error) {
    const temp = error as AxiosError;
    yield put(
      setError(temp.response ? temp.response?.data : { message: temp.message })
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* registerUserSaga(action: { type: string; payload: any }) {
  try {
    yield put(setLoading(true));
    const response: AxiosResponse = yield call(
      axios.post,
      `${baseURL}/register/v2`,
      action.payload
    );
    const user = response.data;
    yield put(setUser(user));
  } catch (error) {
    const temp = error as AxiosError;
    yield put(
      setError(temp.response ? temp.response?.data : { message: temp.message })
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* loginUserSaga(action: { type: string; payload: any }) {
  try {
    yield put(setLoading(true));
    const response: AxiosResponse = yield call(
      axios.post,
      `${baseURL}/login`,
      action.payload
    );
    const user = response.data;
    yield put(setUser(user));
  } catch (error) {
    yield put(setError((error as AxiosError).response?.data));
  } finally {
    yield put(setLoading(false));
  }
}

function* userSaga() {
  yield takeLatest("user/registerUser", registerUserSaga);
  yield takeLatest("user/loginUser", loginUserSaga);
  yield takeLatest("user/fetchProfiles", fetchProfiles);
  yield takeLatest("user/updateProfileDetail", updateProfileDetail);
}

export default userSaga;
