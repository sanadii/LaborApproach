// Selectors/campaignsSelectors.js
import { createSelector } from 'reselect';

const selectChatState = state => state.Chat;

export const chatSelector = createSelector(
  selectChatState,
  (chatsState) => ({

    // Campaign Selectors
    chatRooms: chatsState.chatRooms,
    chatChannels: chatsState.chatChannels,
    messages: chatsState.messages,


    // campaign: chatsState.campaignDetails,
    // campaignId: chatsState.campaignDetails.id,
    // campaignDetails: chatsState.campaignDetails,


  })
);
