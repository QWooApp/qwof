import Flag from "../images/backgrounds/Flag.jpg";

import { useEffect } from "react";

import AuthPage from "../components/AuthPage";
import LoginForm from "../components/LoginForm";

function Login() {
  useEffect(() => {
    document.title = "Login / QWoo";
  }, []);

  return (
    <AuthPage
      image={Flag}
      title="Sign In"
      btnText="Log in"
      AuthForm={<LoginForm />}
      description="A platform for the people - by the people."
    />
  );
}

export default Login;
