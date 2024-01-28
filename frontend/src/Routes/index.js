import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

//Layouts
import NonAuthLayout from "../Layouts/NonAuthLayout";
import VerticalLayout from "../Layouts/index";

//routes
import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AuthProtected } from './AuthProtected';


import { setAuthorization } from "helpers/api_helper";
import { useSelector, useDispatch } from "react-redux";
import { useProfile } from "hooks/UserHooks";
import { getCurrentUser, logoutUser } from "store/actions";


const Index = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.Users.currentUser);

    const { userProfile, loading, token } = useProfile();

    useEffect(() => {
        if (userProfile && !loading && token) {
            setAuthorization(token);
            if (!user || user.length === 0) {
                dispatch(getCurrentUser());
            }
        } else if (!userProfile && loading && !token) {
            dispatch(logoutUser());
        }
    }, [token, loading, dispatch, user, userProfile]);

    return (
        <React.Fragment>
            <Routes>
                <Route>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <NonAuthLayout>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </NonAuthLayout>
                            }
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>

                <Route>
                    {authProtectedRoutes.map((route, idx) => (
                        <Route
                            path={route.path}
                            element={
                                <AuthProtected token={token}>
                                    <VerticalLayout>{route.component}</VerticalLayout>
                                </AuthProtected>}
                            key={idx}
                            exact={true}
                        />
                    ))}
                </Route>
            </Routes>
        </React.Fragment>
    );
};

export default Index;