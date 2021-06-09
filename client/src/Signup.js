import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";

import { LandingPageSidebar } from "./components";
import { authUseStyles } from "./stylesHook";

import { register } from "./store/utils/thunkCreators";

const Signup = () => {
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
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    await dispatch(register({ username, email, password }));
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
          <Typography className={text}>Already have an account?</Typography>
          <Button
            variant="contained"
            size="large"
            className={button}
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid className={formContentContainer}>
            <Typography variant="h4" className={headLine}>
              Create an account
            </Typography>
            <Grid className={formControlContainer}>
              <FormControl fullWidth>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={formControlContainer}>
              <FormControl fullWidth>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={formControlContainer}>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={formControlContainer}>
              <FormControl error={!!formErrorMessage.confirmPassword} fullWidth>
                <TextField
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              className={buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default Signup;
