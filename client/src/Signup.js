import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles, useTheme } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

import backgroundImg from "./assets/bg-img.png";
import bubbleImg from "./assets/bubble.svg";

const styles = (theme) => ({
  root: {
    height: "100vh",
  },
  leftBoxContainer: {
    backgroundImage: `linear-gradient(rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)),url(${backgroundImg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100vw 100vh",
    width: "100vw",
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      backgroundSize: "100vw",
    },
    [theme.breakpoints.up("md")]: {
      backgroundSize: "50vw",
      width: "50vw",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundSize: "40vw",
      width: "40vw",
    },
  },
  boxImage: {
    width: "16vw",
    position: "relative",
    top: -80,
    [theme.breakpoints.up("sm")]: {
      top: 95,
      width: "15vw",
    },
    [theme.breakpoints.up("md")]: {
      top: -55,
      width: "8vw",
    },
    [theme.breakpoints.up("lg")]: {
      top: 0,
      width: "6vw",
    },
  },
  boxText: {
    fontSize: "1.5rem",
    color: "#fff",
    textAlign: "center",
    width: "70vw",
    padding: 10,
    marginTop: 10,
    position: "relative",
    top: -70,
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      top: 90,
      width: "60vw",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
      top: -30,
      width: "35vw",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2.8rem",
      top: 0,
      width: "35vw",
    },
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
      padding: "2.5rem",
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
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0.625rem 6.5rem",
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
});

const Login = (props) => {
  const history = useHistory();
  const {
    user,
    register,
    classes: {
      root,
      leftBoxContainer,
      boxImage,
      boxText,
      rightBoxContainer,
      button,
      text,
      formControlContainer,
      buttonSubmit,
      headLine,
      formContentContainer,
    },
  } = props;
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

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={root} container>
      <Box
        className={leftBoxContainer}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <img className={boxImage} src={bubbleImg} alt="bubble" />
        <Typography className={boxText}>
          Converse with anyone with any language
        </Typography>
      </Box>
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
