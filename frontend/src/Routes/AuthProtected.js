import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";

const AuthProtected = (props) => {
  const { token, children } = props;

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// if (!user || user.length === 0) {
//   return <div>Loading...</div>;
// }

//   return <>{props.children}</>;
// };

const AccessRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export { AuthProtected, AccessRoute };
