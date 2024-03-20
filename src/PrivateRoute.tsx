import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import firebase from 'firebase';

export default function PrivateRoute({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const user = firebase.auth().currentUser;

  const isLoggedIn = user != null;

  return (
    <Route
      render={(props) =>
        isLoggedIn ? (
          <>{children}</>
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}
