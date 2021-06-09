import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  rightBoxContainer: {
    padding: ".625rem",
    margin: ".625rem",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      padding: "1rem",
      margin: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "2rem",
      margin: "1rem",
    },
  },
  button: {
    color: "#3A8DFF",
    backgroundColor: "#fff",
    fontSize: 15,
    boxShadow: "0px 2px 4px 1px #B0B0B0",
    padding: "0.75rem 2rem",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#3A8DFF",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.25rem",
      padding: "1.5rem 4.5rem",
    },
  },
  buttonSubmit: {
    padding: "0.75rem 2.5rem",
    [theme.breakpoints.up("sm")]: {
      padding: "1.5rem 4.5rem",
      fontSize: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "1.5rem 7.5rem",
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
      margin: "4rem 0",
      padding: "0 5rem",
    },
    [theme.breakpoints.up("md")]: {
      margin: "2rem 0",
      padding: "0 2rem",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "7rem 0",
      padding: "0 7rem",
    },
  },
  formControlContainer: {
    marginBottom: "1.5rem",
  },
}));
