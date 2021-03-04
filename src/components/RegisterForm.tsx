import { useState, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import useStyles from "./styles/AuthForm";
import AuthFormFooter from "./AuthFormFooter";
import { UserData } from "../store/auth/types";

function RegisterForm() {
  const classes = useStyles();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    last_name: "",
    first_name: "",
  });

  const handleRegisterForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(userData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegisterForm} className={classes.form}>
      {loading ? (
        <>
          <br />
          <LinearProgress />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                autoFocus
                fullWidth
                id="first_name"
                name="firstName"
                variant="outlined"
                label="First Name"
                autoComplete="first_name"
                value={userData.first_name}
                onChange={(e) =>
                  setUserData({ ...userData, first_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                required
                fullWidth
                id="last_name"
                name="last_name"
                label="Last Name"
                variant="outlined"
                autoComplete="last_name"
                value={userData.last_name}
                onChange={(e) =>
                  setUserData({ ...userData, last_name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                fullWidth
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                autoComplete="username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                required
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                autoComplete="password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I agree to the terms and conditions."
                />
              </Grid>
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Having trouble? Contact us.
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <AuthFormFooter />
          </Box>
        </>
      )}
    </form>
  );
}

export default RegisterForm;
