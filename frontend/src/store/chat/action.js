import {
  GET_DIRECT_CONTACT,
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,


  // Chat Channels
  GET_CHAT_CHANNELS,
  ADD_NEW_CHAT_CHANNEL,
  UPDATE_CHAT_CHANNEL,
  DELETE_CHAT_CHANNEL,

  // Chat Rooms
  GET_CHAT_ROOMS,
  ADD_NEW_CHAT,

  // Messages
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  ADD_MESSAGE,
  DELETE_MESSAGE
} from "./actionType";

// common success
export const chatsApiResponseSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const chatsApiResponseError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

export const getDirectContact = () => ({
  type: GET_DIRECT_CONTACT,
});

// Chat Channels
export const getChatChannels = () => ({
  type: GET_CHAT_CHANNELS,
});

export const addNewChatChannel = (chatChannel) => ({
  type: ADD_NEW_CHAT_CHANNEL,
  payload: chatChannel,
});

export const updateChatChannel = (chatChannel) => ({
  type: UPDATE_CHAT_CHANNEL,
  payload: chatChannel,
});

export const deleteChatChannels = (chatChannel) => ({
  type: DELETE_CHAT_CHANNEL,
  payload: chatChannel,
});


// Chat Room
export const getChatRooms = roomId => ({
  type: GET_CHAT_ROOMS,
  roomId,
})

export const addNewChat = (message) => ({
  type: ADD_NEW_CHAT,
  payload: message,
});

// Chat Messages
export const getMessages = roomId => ({
  type: GET_MESSAGES,
  roomId,
})

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  payload: message,
});

export const getMessagesSuccess = messages => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
})

export const getMessagesFail = error => ({
  type: GET_MESSAGES_FAIL,
  payload: error,
})

export const deleteMessage = (message) => ({
  type: DELETE_MESSAGE,
  payload: message,
});
