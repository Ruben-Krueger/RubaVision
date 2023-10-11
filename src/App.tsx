import '@mantine/core/styles.css';
import { MantineProvider, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/Start';
import React, { Suspense } from 'react';
import Settings from './components/Settings';
import Canvas from './components/Canvas';
import PageNotFound from './components/PageNotFound';

function App(): JSX.Element {
  console.log(process.env.PUBLIC_URL);
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <MantineProvider>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <Start />
            </Route>
            <Route path="/play">
              <Canvas />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Suspense>
      </MantineProvider>
    </Router>
  );
}

export default App;
