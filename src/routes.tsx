import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <ProtectedRoute path="/settings" component={Settings} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default BaseRouter;
