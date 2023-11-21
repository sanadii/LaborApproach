import { all, fork } from "redux-saga/effects";

// Authentication
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import UsersSaga from "./auth/users/saga";
import GroupsSaga from "./groups/saga";


// Messages
import chatSaga from "./chat/saga";

// System
import UploadImageSaga from "./uploadImage/saga";


// Settings
import LayoutSaga from "./layouts/saga";
import Categories from "./categories/saga";


export default function* rootSaga() {
  yield all([
    // Authentication
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(UsersSaga),
    fork(GroupsSaga),

    // Messages
    fork(chatSaga),


    // System / Settings
    fork(LayoutSaga),
    fork(UploadImageSaga),
    fork(Categories),

  ]);
}
