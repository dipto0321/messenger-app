import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

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
    height: "65vh",
    [theme.breakpoints.up("sm")]: {
      backgroundSize: "100vw",
      height: "95vh",
    },
    [theme.breakpoints.up("md")]: {
      backgroundSize: "50vw",
      width: "50vw",
      height: "100vh",
    },
    [theme.breakpoints.up("lg")]: {
      backgroundSize: "40vw",
      width: "40vw",
    },
  },
  boxImage: {
    width: "4rem",
    position: "relative",
    top: 64,
    [theme.breakpoints.up("sm")]: {
      top: 120,
      width: "6.25rem",
    },
    [theme.breakpoints.up("md")]: {
      top: -55,
      width: "5rem",
    },
    [theme.breakpoints.up("lg")]: {
      top: 10,
      width: "7.5rem",
    },
  },
  boxText: {
    fontSize: "1.5rem",
    color: "#fff",
    textAlign: "center",
    width: 300,
    padding: 10,
    marginTop: 10,
    position: "relative",
    top: 70,
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
      top: 130,
      width: 415,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
      top: -40,
      width: 340,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "2rem",
      top: 0,
      width: 340,
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
    fontSize: 14,
    marginRight: 10,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
      marginRight: 20,
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
    login,
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

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
