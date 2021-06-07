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
  boxContainer: {
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
});

const Login = (props) => {
  const history = useHistory();
  const {
    user,
    register,
    classes: { root, boxContainer, boxImage, boxText },
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
        className={boxContainer}
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
      <Box>
        <Grid container item>
          <Typography>Need to log in?</Typography>
          <Button onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <form onSubmit={handleRegister}>
          <Grid>
            <Grid>
              <FormControl>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl>
                <TextField
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
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
            <Grid>
              <FormControl error={!!formErrorMessage.confirmPassword}>
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
            <Button type="submit" variant="contained" size="large">
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
