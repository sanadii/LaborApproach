import { useSelector } from "react-redux";
import { useProfile } from "../hooks/UserHooks";

const usePassiveAuthCheck = () => {
    const { userProfile, loading, token } = useProfile();

    const user = token ? "Logged In User" : "Guest";
    console.log("Current User:", user);
};

export default usePassiveAuthCheck;
