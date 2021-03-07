import Balloon from "../images/backgrounds/Balloon.jpg";

import { useEffect } from "react";

import AuthPage from "../components/AuthPage";
import RegisterForm from "../components/RegisterForm";

function Register() {
  useEffect(() => {
    document.title = "Sign Up / QWoo";
  }, []);

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
