import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_ATTENDEES,
  GET_ATTENDEE,
  UPDATE_ATTENDEE,
  UPDATE_ATTENDEE_SUCCESS,
  UPDATE_ATTENDEE_FAIL,
  ADD_NEW_ATTENDEE,
  ADD_ATTENDEE_SUCCESS,
  ADD_ATTENDEE_FAIL,
  DELETE_ATTENDEE,
  DELETE_ATTENDEE_SUCCESS,
  DELETE_ATTENDEE_FAIL,
} from "./actionType";

// common success
export const electorsApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const electorsApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getAttendees = () => ({
  type: GET_ATTENDEES,
});

export const getAttendee = (attendee) => ({
  type: GET_ATTENDEE,
  payload: attendee,
});

export const updateAttendee = (attendee) => ({
  type: UPDATE_ATTENDEE,
  payload: attendee,
});

export const updateAttendeeSuccess = (attendee) => ({
  type: UPDATE_ATTENDEE_SUCCESS,
  payload: attendee,
});

export const updateAttendeeFail = (error) => ({
  type: UPDATE_ATTENDEE_FAIL,
  payload: error,
});

export const addNewAttendee = (attendee) => ({
  type: ADD_NEW_ATTENDEE,
  payload: attendee,
});

export const addAttendeeSuccess = (attendee) => ({
  type: ADD_ATTENDEE_SUCCESS,
  payload: attendee,
});

export const addAttendeeFail = (error) => ({
  type: ADD_ATTENDEE_FAIL,
  payload: error,
});

export const deleteAttendee = (attendee) => ({
  type: DELETE_ATTENDEE,
  payload: attendee,
});

export const deleteAttendeeSuccess = (attendee) => ({
  type: DELETE_ATTENDEE_SUCCESS,
  payload: attendee,
});

export const deleteAttendeeFail = (error) => ({
  type: DELETE_ATTENDEE_FAIL,
  payload: error,
});
