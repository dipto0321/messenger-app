import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
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
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  rightBoxContainer: {
    width: "100vw",
    padding: 20,
    [theme.breakpoints.up("md")]: {
      width: "40vw",
      padding: "2.5rem",
    },
    [theme.breakpoints.up("lg")]: {
      width: "54vw",
      padding: "2rem",
    },
  },
  button: {
    color: "#3A8DFF",
    backgroundColor: "#fff",
    fontSize: 15,
    "&:hover": {
      color: "#fff",
      backgroundColor: "#3A8DFF",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
    },
  },
  buttonSubmit: {
    padding: "0.625rem 2.5rem",
    [theme.breakpoints.up("sm")]: {
      padding: "0.625rem 4.5rem",
      fontSize: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0.625rem 7.5rem",
      fontSize: "1.25rem",
    },
  },
  text: {
    color: "#B0B0B0",
    padding: 10,
    fontSize: 14,
    marginRight: 10,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
  },
  headLine: {
    fontWeight: "600",
    fontSize: 16,
    textAlign: "start",
    marginBottom: "1rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.6rem",
    },
  },
  formContentContainer: {
    margin: "1.5rem 0",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      margin: "5rem 0",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "7rem 0",
    },
  },
  formControlContainer: {
    marginBottom: "1.5rem",
  },
}));

const Signup = () => {
  const history = useHistory();
  const {
    root,
    rightBoxContainer,
    button,
    text,
    formControlContainer,
    buttonSubmit,
    headLine,
    formContentContainer,
  } = useStyles();

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
    <Grid className={root} container>
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
