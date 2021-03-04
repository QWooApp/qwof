import Flag from "../images/backgrounds/Flag.jpg";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthPage from "../components/AuthPage";
import LoginForm from "../components/LoginForm";
import { useAuthenticated } from "../store/auth/hooks";

function Login() {
  const history = useHistory();
  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [history, isAuthenticated]);

  return (
    <AuthPage
      image={Flag}
      title="Log In"
      btnText="Sign in"
      AuthForm={<LoginForm />}
      description="A platform for the people - by the people."
    />
  );
}

export default Login;
