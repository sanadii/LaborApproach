// Components/Hooks/usePermission.js
import { useSelector } from 'react-redux';
import { userSelector, campaignSelector } from 'Selectors';

// Define a List of Entities:
const entities = [
    'User', 'Group', 'Permission',
];

// Define a List of Actions
const actions = ['canAdd', 'canView', 'canChange', 'canDelete'];

const computePermissions = (hasPermission) => {
    let permissionsObject = {};

    entities.forEach(entity => {
        actions.forEach(action => {
            const permission = `${action}${entity}`;
            permissionsObject[permission] = hasPermission(permission);
        });
    });

    return permissionsObject;
};



const usePermission = () => {
    const { currentUser } = useSelector(userSelector);

    // Extract permissions based on the user's roles
    const getPermissions = () => {
        // Use only user permissions as campaignMember is removed
        return currentUser.permissions || [];
    };

    const permissions = getPermissions();

    // Check if the user has a specific permission
    const hasPermission = (permission) => permissions.includes(permission);

    // Get the pre-computed permissions
    const specificPermissions = computePermissions(hasPermission);

    return {
        ...specificPermissions,  // spread out the specific permissions
    };
};

export { usePermission };
