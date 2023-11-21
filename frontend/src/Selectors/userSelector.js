// Selectors/userSelectors.js
import { createSelector } from 'reselect';

const selectUsersState = state => state.Users;

export const userSelector = createSelector(
    selectUsersState,
    (usersState) => ({
        // User Selectors
        isUserSuccess: usersState.isUserSuccess,
        error: usersState.error,
        user: usersState.currentUser,
        currentUser: usersState.currentUser,
        users: usersState.users,
        moderators: moderators(usersState.users)
    })
);

export const moderators = createSelector(
    [selectUsersState],  // Changed to selectUsersState
    (usersState) => usersState.users.filter(user => user.role === 'moderator')
);
