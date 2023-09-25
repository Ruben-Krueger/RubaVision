import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './start';
import Canvas from './canvas';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/play">
            <Canvas />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
}

export default App;
