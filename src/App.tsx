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

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MantineProvider>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              {/* I could never get a component to render in prod at "/" */}
            </Route>
            <Route path="/login">
              <RVErrorBoundary>
                <Login />
              </RVErrorBoundary>
            </Route>
            <Route exact path="/start">
              <RVErrorBoundary>
                <Start />
              </RVErrorBoundary>
            </Route>
            <Route path="/play">
              <RVErrorBoundary>
                <Canvas />
              </RVErrorBoundary>
            </Route>
            <Route path="/end">
              <RVErrorBoundary>
                <End />
              </RVErrorBoundary>
            </Route>
            <Route path="/settings">
              <RVErrorBoundary>
                <Settings />
              </RVErrorBoundary>
            </Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </MantineProvider>
    </Router>
  );
}

export default App;
