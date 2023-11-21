import { combineReducers } from "redux";




// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";
import Users from "./auth/users/reducer";
import Groups from "./groups/reducer";

// Messages
import Chat from "./chat/reducer";


// System
import UploadImage from "./uploadImage/reducer";


// Front
import Layout from "./layouts/reducer";


// Settings
import Categories from "./categories/reducer";

//API Key
const rootReducer = combineReducers({

    // Theme
    Layout,
    Login,
    Account,
    ForgetPassword,
    Profile,
    Users,
    Groups,


    // Chat
    Chat,
    
    // System / Settings
    UploadImage,
    Categories,

});

export default rootReducer;