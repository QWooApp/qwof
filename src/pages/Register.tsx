import Balloon from "../images/backgrounds/Balloon.jpg";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthPage from "../components/AuthPage";
import LoginForm from "../components/LoginForm";
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
      AuthForm={<LoginForm />}
      authProviderBtnText="Sign up with"
      description="It's free and always will be - unlike some!"
    />
  );
}

export default Register;
