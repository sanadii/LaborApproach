import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import {
  GET_DIRECT_CONTACT,

  // Chat Rooms
  GET_CHAT_ROOMS,
  ADD_NEW_CHAT,

  // Chat Channels
  GET_CHAT_CHANNELS,
  ADD_NEW_CHAT_CHANNEL,
  DELETE_CHAT_CHANNEL,

  // Chat Messages
  GET_MESSAGES,
  ADD_MESSAGE,
  DELETE_MESSAGE,
} from "./actionType";

import {
  chatsApiResponseSuccess,
  chatsApiResponseError,
  getMessagesFail,
  getMessagesSuccess,
} from "./action";

//Include Both Helper File with needed methods
import {
  getDirectContact as getDirectContactApi,

  // Chat Rooms
  getChatRooms as getChatRoomsApi,
  addNewChat as addNewChatApi,

  // Chat Channels
  getChatChannels as getChatChannelsApi,
  addNewChatChannel as addNewChatChannelApi,
  deleteChatChannel as deleteChatChannelApi,

  // Chat Messages
  getMessages as getMessagesApi,
  addMessage as addMessageApi,
  deleteMessage as deleteMessageApi,
} from "helpers/backend_helper";

function* getDirectContact() {
  try {
    const response = yield call(getDirectContactApi);
    yield put(chatsApiResponseSuccess(GET_DIRECT_CONTACT, response));
  } catch (error) {
    yield put(chatsApiResponseError(GET_DIRECT_CONTACT, error));
  }
}

// Chat Channels
function* getChatChannels() {
  try {
    const response = yield call(getChatChannelsApi);
    yield put(chatsApiResponseSuccess(GET_CHAT_CHANNELS, response));
  } catch (error) {
    yield put(chatsApiResponseError(GET_CHAT_CHANNELS, error));
  }
}

function* addNewChatChannel({ payload: chatChannel }) {
  try {
    const response = yield call(addNewChatChannelApi, chatChannel);
    yield put(chatsApiResponseSuccess(ADD_NEW_CHAT_CHANNEL, response));
  } catch (error) {
    yield put(chatsApiResponseError(ADD_NEW_CHAT_CHANNEL, error));
  }
}

function* deleteChatChannel({ payload: chatChannel }) {
  try {
    const response = yield call(deleteMessageApi, chatChannel);
    yield put(chatsApiResponseSuccess(DELETE_CHAT_CHANNEL, response));
  } catch (error) {
    yield put(chatsApiResponseError(DELETE_CHAT_CHANNEL, error));
  }
}

function* getMessages({ roomId }) {
  try {
    const response = yield call(getMessagesApi, roomId);
    yield put(getMessagesSuccess(response));
  } catch (error) {
    yield put(getMessagesFail(error));
  }
}


function* getChatRooms() {
  try {
    const response = yield call(getChatRoomsApi);
    yield put(chatsApiResponseSuccess(GET_CHAT_ROOMS, response));
  } catch (error) {
    yield put(chatsApiResponseError(GET_CHAT_ROOMS, error));
  }
}
function* addNewChat({ payload: message }) {
  try {
    const response = yield call(addNewChatApi, message);
    yield put(chatsApiResponseSuccess(ADD_NEW_CHAT, response));
  } catch (error) {
    yield put(chatsApiResponseError(ADD_NEW_CHAT, error));
  }
}

function* addMessage({ payload: message }) {
  try {
    const response = yield call(addMessageApi, message);
    yield put(chatsApiResponseSuccess(ADD_MESSAGE, response));
  } catch (error) {
    yield put(chatsApiResponseError(ADD_MESSAGE, error));
  }
}

function* deleteMessage({ payload: message }) {
  try {
    const response = yield call(deleteMessageApi, message);
    yield put(chatsApiResponseSuccess(DELETE_MESSAGE, response));
  } catch (error) {
    yield put(chatsApiResponseError(DELETE_MESSAGE, error));
  }
}

// Watchers

export function* watchGetDirectContact() {
  yield takeEvery(GET_DIRECT_CONTACT, getDirectContact);
}


// Chat Room
export function* watchOnGetChatRooms() {
  yield takeEvery(GET_CHAT_ROOMS, getChatRooms);
}
export function* watchOnAddNewChat() {
  yield takeEvery(ADD_NEW_CHAT, addNewChat);
}

// Chat Channels
export function* watchOnGetChatChannels() {
  yield takeEvery(GET_CHAT_CHANNELS, getChatChannels);
}
export function* watchOnAddNewChatChannel() {
  yield takeEvery(ADD_NEW_CHAT_CHANNEL, addNewChatChannel);
}
export function* watchOnDeleteChatChannel() {
  yield takeEvery(DELETE_CHAT_CHANNEL, deleteChatChannel);
}

// Chat Messages
export function* watchOnGetMessages() {
  yield takeEvery(GET_MESSAGES, getMessages);
}
export function* watchOnAddMessage() {
  yield takeEvery(ADD_MESSAGE, addMessage);
}
export function* watchOnDeleteMessage() {
  yield takeEvery(DELETE_MESSAGE, deleteMessage);
}

function* chatSaga() {
  yield all([
    fork(watchGetDirectContact),
    fork(watchOnGetMessages),

    // Chat Room
    fork(watchOnGetChatRooms),
    fork(watchOnAddNewChat),

    // Chat Channels
    fork(watchOnGetChatChannels),
    fork(watchOnAddNewChatChannel),
    fork(watchOnDeleteChatChannel),

    // Chat Messages
    fork(watchOnAddMessage),
    fork(watchOnAddMessage),
    fork(watchOnDeleteMessage),
  ]);
}

export default chatSaga;
