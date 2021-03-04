import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const BaseRouter = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <ProtectedRoute path="/settings" component={Settings} />
    <Route path="*" component={NotFound} />
  </Switch>
);

export default BaseRouter;
