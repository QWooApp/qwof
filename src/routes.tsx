import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
  </Switch>
);

export default BaseRouter;
