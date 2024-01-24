import { APIClient } from "./api_helper";
import * as url from "./url_helper";
import axios from "axios";

const api = new APIClient();
// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
// export const postJwtLogin = data => api.create(url.POST_JWT_LOGIN, data);
export const postJwtLogin = data => api.create(url.POST_JWT_LOGIN, data);

// Register Method
export const postFakeRegister = (data) => api.create(url.POST_REGISTER, data);
export const postFakeLogin = (data) => api.create(url.POST_LOGIN, data);
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_PASSWORD_FORGET, data);
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);
export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

export const postJwtForgetPwd = (data) => api.create(url.POST_JWT_PASSWORD_FORGET, data);
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);


// Users
export const getUsers = () => api.get(url.GET_USERS);
export const getUserDetails = (user) => api.get(url.GET_USER_DETAILS + "/" + user.id);

export const addNewUser = (user) => api.create(url.ADD_NEW_USER, user);
export const updateUser = (user) => api.update(url.UPDATE_USER_PROFILE + "/" + user.id, user);
export const changeUserPassword = (user) => api.update(url.CHANGE_USER_PASSWORD + "/" + user.id, user);
export const deleteUser = (user) => api.delete(url.DELETE_USER + "/" + user);
export const getCurrentUser = () => api.get(url.GET_CURRENT_USER);


// Groups
export const getGroups = () => api.get(url.GET_GROUPS);
export const getGroupDetails = (group) => api.get(url.GET_GROUP_DETAILS + "/" + group.id);
export const addNewGroup = (group) => api.upload(url.ADD_NEW_GROUP, group);
export const updateGroup = (group) => api.update(url.UPDATE_GROUP + "/" + group.id, group);
export const deleteGroup = (group) => api.delete(url.DELETE_GROUP + "/" + group);

// attendees
export const getAttendee = (attendee) => api.get(url.GET_ATTENDEE, attendee);
export const getAttendees = (attendee) => api.get(url.GET_ATTENDEES, attendee);
// export const getAttendees = (attendee) => api.get(url.GET_ATTENDEES, attendee);
export const deleteAttendee = (attendee) => api.delete(url.DELETE_ATTENDEE + "/" + attendee);
export const addNewAttendee = (attendee) => api.create(url.ADD_NEW_ATTENDEE, attendee);
export const updateAttendee = (attendee) => api.update(url.UPDATE_ATTENDEE + "/" + attendee.id, attendee);
