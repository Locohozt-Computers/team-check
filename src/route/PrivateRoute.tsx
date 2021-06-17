import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

// interface PrivateRouteProps extends RouteProps {
//   // tslint:disable-next-line:no-any
//   component: ReactNode;
//   isSignedIn: boolean;
// }

type PrivateRouteProps = RouteProps & { isAuth: boolean; component: any };

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isAuth, ...rest } = props;
  let token: any = localStorage.getItem("techCheckPoint");
  token = JSON.parse(token)?.token

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuth && Boolean(token) ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth/signin",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
