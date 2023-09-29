import '@mantine/core/styles.css';
import { MantineProvider, createTheme, Loader } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './start';
import React, { lazy, Suspense } from 'react';
import Settings from './Settings';

// Necessary to lazy import this because p5 overwrites the DOM
const Canvas = lazy(() => import('./canvas'));

const theme = createTheme({});

function App() {
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
