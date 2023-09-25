// import '@mantine/core/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Start from './start'

const theme = createTheme({
  /** Put your mantine theme override here */
});

{/* <MantineProvider theme={theme}>
</MantineProvider> */}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Start/>
        </Route>
        <Route path="/canvas">
          <h1>about</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
