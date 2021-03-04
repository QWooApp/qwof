import { createElement } from "react";
import { Redirect, Route } from "react-router";

import { useAuthenticated } from "../store/auth/hooks";

function ProtectedRoute({ component, ...rest }: any) {
  const isAuthenticated = useAuthenticated();
  const routeComponent = (props: any) =>
    isAuthenticated ? (
      createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
}

export default ProtectedRoute;
