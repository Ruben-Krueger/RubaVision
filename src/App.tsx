import '@mantine/core/styles.css';
import { MantineProvider, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/Start';
import React, { Suspense } from 'react';
import Settings from './components/Settings';
import Canvas from './components/Canvas';
import PageNotFound from './components/PageNotFound';
import End from './components/End';
import RVErrorBoundary from './components/RVErrorBoundary';

function App(): JSX.Element {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MantineProvider>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              {/* I could never get a component to render in prod at "/" */}
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
