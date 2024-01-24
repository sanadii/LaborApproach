import { call, put, takeEvery, all, fork } from "redux-saga/effects";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Invoice Redux States
import {
  GET_ATTENDEES,
  GET_ATTENDEE,
  ADD_NEW_ATTENDEE,
  DELETE_ATTENDEE,
  UPDATE_ATTENDEE,
} from "./actionType";

import {
  electorsApiResponseSuccess,
  electorsApiResponseError,
  addAttendeeSuccess,
  addAttendeeFail,
  updateAttendeeSuccess,
  updateAttendeeFail,
  deleteAttendeeSuccess,
  deleteAttendeeFail,
} from "./action";

//Include Both Helper Attendee with needed methods
import {
  getAttendees as getAttendeesApi,
  getAttendee as getAttendeeApi,
  addNewAttendee,
  updateAttendee,
  deleteAttendee,
} from "../../helpers/backend_helper";

function* getAttendees() {
  try {
    const response = yield call(getAttendeesApi);
    yield put(electorsApiResponseSuccess(GET_ATTENDEES, response.data));
  } catch (error) {
    yield put(electorsApiResponseError(GET_ATTENDEES, error));
  }
}

function* getAttendee({ payload: attendee }) {
  try {
    const response = yield call(getAttendeeApi, attendee);
    yield put(electorsApiResponseSuccess(GET_ATTENDEE, response.data));
  } catch (error) {
    yield put(electorsApiResponseError(GET_ATTENDEE, error));
  }
}

function* onAddNewAttendee({ payload: attendee }) {
  try {
    const response = yield call(addNewAttendee, attendee);
    yield put(addAttendeeSuccess(response));
    toast.success("Attendee Added Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(addAttendeeFail(error));
    toast.error("Attendee Added Failed", { autoClose: 3000 });
  }
}

function* onUpdateAttendee({ payload: attendee }) {
  try {
    const response = yield call(updateAttendee, attendee);

    yield put(updateAttendeeSuccess(response));
    toast.success("Attendee Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(updateAttendeeFail(error));
    toast.error("Attendee Updated Failed", { autoClose: 3000 });
  }
}

function* onDeleteAttendee({ payload: attendee }) {
  try {
    const response = yield call(deleteAttendee, attendee);
    yield put(deleteAttendeeSuccess({ attendee, ...response }));
    toast.success("Attendee Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    yield put(deleteAttendeeFail(error));
    toast.error("Attendee Delete Failed", { autoClose: 3000 });
  }
}

export function* watchGetAttendees() {
  yield takeEvery(GET_ATTENDEES, getAttendees);
}

export function* watchGetelectors() {
  yield takeEvery(GET_ATTENDEE, getAttendee);
}

export function* watchUpdateAttendee() {
  yield takeEvery(UPDATE_ATTENDEE, onUpdateAttendee);
}

export function* watchDeleteAttendee() {
  yield takeEvery(DELETE_ATTENDEE, onDeleteAttendee);
}

export function* watchAddNewAttendee() {
  yield takeEvery(ADD_NEW_ATTENDEE, onAddNewAttendee);
}

function* AttendeeManager() {
  yield all([
    fork(watchGetAttendees),
    fork(watchGetelectors),
    fork(watchAddNewAttendee),
    fork(watchUpdateAttendee),
    fork(watchDeleteAttendee),
  ]);
}

export default AttendeeManager;
