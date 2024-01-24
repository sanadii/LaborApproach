import { call, put, takeEvery, all, fork, take } from "redux-saga/effects";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Group Redux States
import {
  GET_GROUPS,
  GET_GROUP_DETAILS,
  ADD_NEW_GROUP,
  DELETE_GROUP,
  UPDATE_GROUP,
} from "./actionType";

import {
  // getGroups, getGroupDetails,
  // API Response
  GroupApiResponseSuccess,
  GroupApiResponseError,

  // Groups
  addNewGroupSuccess,
  addNewGroupFail,
  updateGroupSuccess,
  updateGroupFail,
  deleteGroupSuccess,
  deleteGroupFail,

} from "./action";

//Include Both Helper File with needed methods
import {
  getGroups as getGroupsApi,
  getGroupDetails as getGroupDetailsApi,
  addNewGroup,
  updateGroup,
  deleteGroup,
} from "../../helpers/backend_helper";

function* getGroups() {
  try {
    const response = yield call(getGroupsApi);
    yield put(GroupApiResponseSuccess(GET_GROUPS, response.data));
  } catch (error) {
    yield put(GroupApiResponseError(GET_GROUPS, error));
  }
}

function* getGroupDetails({ payload: group }) {
  try {
    const response = yield call(getGroupDetailsApi, group);
    yield put(GroupApiResponseSuccess(GET_GROUP_DETAILS, response.data));
  } catch (error) {
    yield put(GroupApiResponseError(GET_GROUP_DETAILS, error));
  }
}

function* onAddNewGroup({ payload: { group, formData } }) {
  try {
    // Call the API function to add a new group & Dispatch the addNewGroupSuccess action with the received data
    const addNewGroupResponse = yield call(addNewGroup, formData);
    yield put(addNewGroupSuccess(addNewGroupResponse));

    toast.success("Group Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addNewGroupFail(error));
    toast.error("Group Added Failed", { autoClose: 2000 });
  }
}

function* onDeleteGroup({ payload: group }) {
  try {
    const response = yield call(deleteGroup, group);
    yield put(deleteGroupSuccess({ group, ...response }));
    toast.success("Group Delete Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteGroupFail(error));
    toast.error("Group Delete Failed", { autoClose: 2000 });
  }
}

function* onUpdateGroup({ payload: group }) {
  try {
    const response = yield call(updateGroup, group);
    yield put(updateGroupSuccess(response));
    toast.success("تم تحديث المجموعة بنجاح", { autoClose: 2000 });
  } catch (error) {
    yield put(updateGroupFail(error));
    toast.error("خطأ في تحديث المجموعة", { autoClose: 2000 });
  }
}

// Watchers
export function* watchGetGroups() {
  yield takeEvery(GET_GROUPS, getGroups);
}
export function* watchGetGroupDetails() {
  yield takeEvery(GET_GROUP_DETAILS, getGroupDetails);
}
export function* watchAddNewGroup() {
  yield takeEvery(ADD_NEW_GROUP, onAddNewGroup);
}
export function* watchUpdateGroup() {
  yield takeEvery(UPDATE_GROUP, onUpdateGroup);
}
export function* watchDeleteGroup() {
  yield takeEvery(DELETE_GROUP, onDeleteGroup);
}

function* groupSaga() {
  yield all([
    // Groups
    fork(watchGetGroups),
    fork(watchGetGroupDetails),
    fork(watchAddNewGroup),
    fork(watchUpdateGroup),
    fork(watchDeleteGroup),
  ]);
}

export default groupSaga;
