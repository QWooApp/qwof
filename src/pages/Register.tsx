import Balloon from "../images/backgrounds/Balloon.jpg";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthPage from "../components/AuthPage";
import RegisterForm from "../components/RegisterForm";
import { useAuthenticated } from "../store/auth/hooks";

function Register() {
  const history = useHistory();
  const isAuthenticated = useAuthenticated();

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [history, isAuthenticated]);

  return (
    <AuthPage
      image={Balloon}
      title="Sign Up"
      btnText="Sign up"
      AuthForm={<RegisterForm />}
      description="It's open and always will be."
    />
  );
}

export default Register;
