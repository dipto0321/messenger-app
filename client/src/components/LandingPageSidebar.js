import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import bubbleImg from "../assets/bubble.svg";
import backgroundImg from "../assets/bg-img.png";

const useStyles = makeStyles((theme) => ({
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
}));

const LandingPageSidebar = () => {
  const { leftBoxContainer, boxImage, boxText } = useStyles();
  return (
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
  );
};

export default LandingPageSidebar;
