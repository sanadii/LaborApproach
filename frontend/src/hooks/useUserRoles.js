// hooks/useUserRoles.js
import { useSelector } from 'react-redux';
import { userSelector } from 'Selectors';

const useUserRoles = () => {
    const { currentUser } = useSelector(userSelector);
    const role = currentUser?.role;

    // Check against each role defined in RoleOptions
    return {
        isAdmin: role === 'admin',
        isModerator: role === 'moderator',
        isManager: role === 'manager',
        isAgent: role === 'agent',
        isSubscriber: role === 'subscriber',
    };
}

export { useUserRoles };
