import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  textStyle: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  avatar: {
    height: 30,
    width: 30,
    marginTop: 6,
  },
}));

const SenderBubble = ({ time, text, otherUser }) => {
  const { root, date, bubble, textStyle, avatar } = useStyles();

  return (
    <Box className={root}>
      <Typography className={date}>{time}</Typography>
      <Box className={bubble}>
        <Typography className={textStyle}>{text}</Typography>
      </Box>
      {otherUser && (
        <Avatar
          alt={otherUser.username}
          src={otherUser.photoUrl}
          className={avatar}
        />
      )}
    </Box>
  );
};

export default SenderBubble;
