import { useDispatch } from "react-redux";
import { useState, FormEvent, MouseEvent } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormHelperText from "@material-ui/core/FormHelperText";
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
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) =>
    e.preventDefault();

  const handleLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tokenResponse = await getToken(credentials);
      dispatch(logIn(tokenResponse.access, credentials.username));
      setLoading(false);
      history.push("/");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
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
      <FormControl required fullWidth variant="outlined" margin="normal">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          labelWidth={85}
          error={error.length !== 0}
          value={credentials.password}
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                aria-label="toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error={error.length !== 0}>{error}</FormHelperText>
      </FormControl>
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
