import React, { useEffect } from 'react';
import withRouter from '../components/Components/withRouter';

import usePassiveAuthCheck from '../hooks/usePassiveAuthCheck';

//redux
import { useSelector } from "react-redux";
import { createSelector } from 'reselect';

const NonAuthLayout = ({ children }) => {
    usePassiveAuthCheck(); // This will log the user status

    const nonauthData = createSelector(
        (state) => state.Layout.layoutModeType,
        (layoutModeType) => layoutModeType
    );

    // Inside your component
    const layoutModeType = useSelector(nonauthData);

    useEffect(() => {
        if (layoutModeType === "dark") {
            document.body.setAttribute("data-bs-theme", "dark");
        } else {
            document.body.setAttribute("data-bs-theme", "light");
        }
        return () => {
            document.body.removeAttribute("data-bs-theme");
        };
    }, [layoutModeType]);
    return (
        <div>
            {children}
        </div>
    );
};

export default withRouter(NonAuthLayout);