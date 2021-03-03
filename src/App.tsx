import React from "react";

import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";

import theme from "./utils/theme";
import BaseRouter from "./routes";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <BaseRouter />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
