import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  rightBoxContainer: {
    padding: 20,
    flexGrow: 1,
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
}));
