import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { LandingPageSidebar } from "./components";
import { authUseStyles } from "./stylesHook";
import { login } from "./store/utils/thunkCreators";

const Login = (props) => {
  const history = useHistory();

  const {
    rightBoxContainer,
    button,
    text,
    formControlContainer,
    buttonSubmit,
    headLine,
    formContentContainer,
  } = authUseStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await dispatch(login({ username, password }));
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container>
      <LandingPageSidebar />
      <Box className={rightBoxContainer}>
        <Grid
          container
          item
          alignItems="center"
          style={{ margin: "15px 0", justifyContent: "flex-end" }}
        >
          <Typography className={text}>Don’t have an account?</Typography>
          <Button
            variant="contained"
            size="large"
            className={button}
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </Grid>
        <form onSubmit={handleLogin}>
          <Grid className={formContentContainer}>
            <Typography variant="h4" className={headLine}>
              Welcome back!
            </Typography>
            <Grid className={formControlContainer}>
              <FormControl fullWidth required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <Grid className={formControlContainer}>
              <FormControl fullWidth required>
                <TextField
                  label="password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Button
              type="submit"
              className={buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Login;
