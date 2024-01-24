// Authentications
export const POST_LOGIN = "/account/signin";
export const POST_JWT_LOGIN = "/userLogin";
export const POST_PASSWORD_FORGET = "/account/forgot-password";
export const POST_JWT_PASSWORD_FORGET = "/account/forget-pwd";
export const SOCIAL_LOGIN = "/account/social-login";
export const POST_REGISTER = "/account/signup";


// Proterm
export const POST_EDIT_JWT_PROFILE = "/account/postProfile";
export const POST_EDIT_PROFILE = "/account/user";



// USERS
export const GET_USERS = "/account/getUsers";
export const GET_USER_DETAILS = "/account/getUserDetails";
export const ADD_NEW_USER = "/account/addNewUser";
export const UPDATE_USER_PROFILE = "/account/updateUser";
export const CHANGE_USER_PASSWORD = "/account/changeUserPassword";
export const DELETE_USER = "/account/deleteUser";
export const GET_CURRENT_USER = "/account/getCurrentUser";

// GROUPS
export const GET_GROUPS = "/account/getGroups";
export const GET_GROUP_DETAILS = "/account/getGroupDetails";
export const ADD_NEW_GROUP = "/account/addNewGroup";
export const UPDATE_GROUP = "/account/updateGroup";
export const DELETE_GROUP = "/account/deleteGroup";

// Attendees
export const GET_ATTENDEE = "/attendees/getAttendee";
export const GET_ATTENDEES = "/attendees/getAttendees";
// export const GET_ATTENDEES = "/attendees/getAttendees";
export const DELETE_ATTENDEE = "/attendees/deleteAttendee";
export const ADD_NEW_ATTENDEE = "/attendees/addAttendee";
export const UPDATE_ATTENDEE = "/attendees/updateAttendee";