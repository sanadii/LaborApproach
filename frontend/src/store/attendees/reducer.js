import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_ATTENDEES,
  GET_ATTENDEE,
  ADD_ATTENDEE_SUCCESS,
  ADD_ATTENDEE_FAIL,
  UPDATE_ATTENDEE_SUCCESS,
  UPDATE_ATTENDEE_FAIL,
  DELETE_ATTENDEE_SUCCESS,
  DELETE_ATTENDEE_FAIL,
} from "./actionType";

const initialState = {
  attendee: [],
  attendee: [],
  attendees: [],
  totalAttendeesCount: [],
  nextPageUrl: [],
  previousPageUrl: {},
};

const Attendees = (state = initialState, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_ATTENDEES:
          return {
            ...state,
            attendees: action.payload.data,
          };
        case GET_ATTENDEE:
          return {
            ...state,
            attendee: action.payload.data,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_ATTENDEES:
          return {
            ...state,
            error: action.payload.error,
          };
        case GET_ATTENDEE:
          return {
            ...state,
            error: action.payload.error,
          };
        default:
          return { ...state };
      }

    case ADD_ATTENDEE_SUCCESS:
      return {
        ...state,
        electorList: [...state.electorList, action.payload],
      };

    case ADD_ATTENDEE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ATTENDEE_SUCCESS:
      return {
        ...state,
        electorList: state.electorList.map((attendee) =>
          attendee.id.toString() === action.payload.id.toString()
            ? { ...attendee, ...action.payload }
            : attendee
        ),
      };

    case UPDATE_ATTENDEE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ATTENDEE_SUCCESS:
      return {
        ...state,
        electorList: state.electorList.filter(
          (attendee) => attendee.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_ATTENDEE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

export default Attendees;
