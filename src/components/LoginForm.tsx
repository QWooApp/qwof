import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import LinearProgress from "@material-ui/core/LinearProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { getToken } from "../api/auth";
import useStyles from "./styles/AuthForm";
import { logIn } from "../store/auth/actions";
import AuthFormFooter from "./AuthFormFooter";
import { Credentials } from "../store/auth/types";

function LoginForm() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLoginForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    getToken(credentials)
      .then((tokenResponse) => {
        setLoading(false);
        setError("");
        dispatch(logIn(tokenResponse.access, credentials.username));
      })
      .catch((e) => {
        setLoading(false);
        setError(e.message);
      });
  };

  return (
    <form onSubmit={handleLoginForm} className={classes.form}>
      {loading && <LinearProgress />}
      <TextField
        required
        fullWidth
        autoFocus
        id="username"
        margin="normal"
        name="username"
        label="Username"
        variant="outlined"
        error={error.length !== 0}
        autoComplete="username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <TextField
        required
        fullWidth
        id="password"
        margin="normal"
        label="Password"
        variant="outlined"
        helperText={error}
        type={showPassword ? "text" : "password"}
        error={error.length !== 0}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                aria-label="toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
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
          <Link component={RouterLink} to="/register" variant="body2">
            {"Don't have an account? Sign Up today."}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
      <Box mt={5}>
        <AuthFormFooter />
      </Box>
    </form>
  );
}

export default LoginForm;
