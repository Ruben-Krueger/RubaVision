import '@mantine/core/styles.css';
import { MantineProvider, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './screens/Start';
import React, { Suspense } from 'react';
import Settings from './screens/Settings';
import Canvas from './screens/Canvas';
import PageNotFound from './screens/PageNotFound';
import End from './screens/End';
import RVErrorBoundary from './components/RVErrorBoundary';
import Login from './screens/Login';

import PrivateRoute from './PrivateRoute';
import Register from './screens/Register';
import ResetPassword from './screens/ResetPassword';
import About from './screens/About';

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MantineProvider>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              {/* I could never get a component to render in prod at "/" */}
            </Route>
            <Route path="/about">
              <RVErrorBoundary>
                <About />
              </RVErrorBoundary>
            </Route>

            <Route path="/reset-password">
              <RVErrorBoundary>
                <ResetPassword />
              </RVErrorBoundary>
            </Route>
            <Route path="/login">
              <RVErrorBoundary>
                <Login />
              </RVErrorBoundary>
            </Route>
            <Route path="/register">
              <RVErrorBoundary>
                <Register />
              </RVErrorBoundary>
            </Route>
            <PrivateRoute
              path="/start"
              element={
                <RVErrorBoundary>
                  <Start />
                </RVErrorBoundary>
              }
            ></PrivateRoute>
            <PrivateRoute
              path="/play"
              element={
                <RVErrorBoundary>
                  <Canvas />
                </RVErrorBoundary>
              }
            ></PrivateRoute>
            <PrivateRoute
              path="/end"
              element={
                <RVErrorBoundary>
                  <End />
                </RVErrorBoundary>
              }
            ></PrivateRoute>
            <PrivateRoute
              path="/settings"
              element={
                <RVErrorBoundary>
                  <Settings />
                </RVErrorBoundary>
              }
            ></PrivateRoute>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </MantineProvider>
    </Router>
  );
}

export default App;
