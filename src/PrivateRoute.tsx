import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

import { RouteProps } from 'react-router-dom';
import { Loader } from '@mantine/core';

export default function PrivateRoute({ children }: RouteProps): JSX.Element {
  const auth = getAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUser(user);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader color="blue" />
      ) : user != null ? (
        children
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
