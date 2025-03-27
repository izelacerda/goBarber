import React from 'react';
import {
  Route as ReactDOMroute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import FullPageLayout from '../components/Layouts/FullPageLayout';
import VerticalPageLayout from '../components/Layouts/VerticalPageLayout';
import HorizontalPageLayout from '../components/Layouts/HorizontalPageLayout';
import { useTheme } from '../hooks/theme';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  isfullLayout?: boolean;
  component: React.ComponentType;
}

// private=true / auth= true => ok
// private=true / auth= false => redicionar para login
// private=false / auth= true => redirecionar par dashboard
// private=false / auth= false => ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  isfullLayout = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <ReactDOMroute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line no-nested-ternary
        return isPrivate === !!user ? (
          // eslint-disable-next-line no-nested-ternary
          isfullLayout ? (
            <FullPageLayout>
              <Component />
            </FullPageLayout>
          ) : theme.name === 'light' ? (
            <VerticalPageLayout>
              <Component />
            </VerticalPageLayout>
          ) : (
            <HorizontalPageLayout>
              <Component />
            </HorizontalPageLayout>
          )
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
