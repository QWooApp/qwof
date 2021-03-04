import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./utils/theme";
import BaseRouter from "./routes";
import Layout from "./components/Layout";
import store, { persistor } from "./store";

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <Layout>
              <BaseRouter />
            </Layout>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
