import {
  GET_DIRECT_CONTACT,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,

  // Chat Channels
  GET_CHAT_CHANNELS,
  ADD_NEW_CHAT_CHANNEL,
  // UPDATE_CHAT_CHANNEL,
  DELETE_CHAT_CHANNEL,

  // Chat Rooms
  GET_CHAT_ROOMS,
  ADD_NEW_CHAT,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,

  // Chat Messeges
  ADD_MESSAGE,
  DELETE_MESSAGE
} from "./actionType";

const INIT_STATE = {
  chatRooms: [],
  chats: [],
  messages: {},
  channels: [],
  error: {},
};

const Chats = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_DIRECT_CONTACT:
          return {
            ...state,
            chats: action.payload.data,
          };

        // Chats Rooms
        case GET_CHAT_ROOMS:
          return {
            ...state,
            chatRooms: action.payload.data.rooms,
          };
        case ADD_NEW_CHAT:
          return {
            ...state,
            messages: [...state.messages, action.payload.data],
          };
        case ADD_MESSAGE:
          return {
            ...state,
            messages: [...state.messages, action.payload.data],
          };
        case DELETE_MESSAGE:
          return {
            ...state,
            messages: state.messages.filter(
              message => message.id.toString() !== action.payload.data.toString()
            ),
          };
        case GET_CHAT_CHANNELS:
          return {
            ...state,
            channels: action.payload.data,
          };
        default:
          return { ...state };
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_DIRECT_CONTACT:
          return {
            ...state,
            error: action.payload.error,
          };

        // Chat Rooms
        case GET_CHAT_ROOMS:
          return {
            ...state,
            error: action.payload.error,
          };
        case ADD_NEW_CHAT:
          return {
            ...state,
            error: action.payload.error,
          };

        // Chat Channels
        case GET_CHAT_CHANNELS:
          return {
            ...state,
            error: action.payload.error,
          };
        case ADD_NEW_CHAT_CHANNEL:
          return {
            ...state,
            error: action.payload.error,
          };
        case DELETE_CHAT_CHANNEL:
          return {
            ...state,
            error: action.payload,
          };
        // Chat Messages
        case ADD_MESSAGE:
          return {
            ...state,
            error: action.payload.error,
          };
        case DELETE_MESSAGE:
          return {
            ...state,
            error: action.payload,
          };

        default:
          return { ...state };
      }

    case GET_DIRECT_CONTACT: {
      return {
        ...state,
      };
    }
    case GET_CHAT_ROOMS: {
      return {
        ...state,
      };
    }

    case GET_CHAT_CHANNELS: {
      return {
        ...state,
      };
    }

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
      };

    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Chats;
