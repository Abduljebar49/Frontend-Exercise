import { all, fork } from "redux-saga/effects";
import watchAutoCompleteSaga from "./autoCompleteSaga";
import currentLocationSaga from "./locationSaga";
import userSaga from "./userSaga";

const rootSaga = function* () {
  yield all([
    fork(watchAutoCompleteSaga),
    fork(currentLocationSaga),
    fork(userSaga),
  ]);
};

export default rootSaga;
