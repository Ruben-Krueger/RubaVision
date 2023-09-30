import '@mantine/core/styles.css';
import { MantineProvider, createTheme, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/Start';
import React, { lazy, Suspense } from 'react';
import Settings from './components/Settings';
import Canvas from './components/Canvas';

const theme = createTheme({});

function App(): JSX.Element {
  return (
    <MantineProvider theme={theme}>
      <Suspense fallback={<Loader />}>
        <Router>
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
          </Switch>
        </Router>
      </Suspense>
    </MantineProvider>
  );
}

export default App;
