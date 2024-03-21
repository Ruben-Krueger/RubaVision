import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

import { RouteProps } from 'react-router-dom';

export default function PrivateRoute({ children }: RouteProps): JSX.Element {
  const auth = getAuth();

  const isLoggedIn = auth.currentUser != null;

  return <>{isLoggedIn ? children : <Redirect to="/login" />}</>;
}
