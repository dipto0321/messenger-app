import { useState } from "react";
import { Paper, InputBase, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  SentimentSatisfiedOutlined,
  FileCopyOutlined,
} from "@material-ui/icons/";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: "#F4F6FA",
    height: 70,
    boxShadow: "none",
  },
  input: {
    height: 70,
    width: "70%",
    backgroundColor: "#F4F6FA",
    padding: 10,
    [theme.breakpoints.up("sm")]: {
      width: "75%",
    },
    [theme.breakpoints.up("md")]: {
      width: "80%",
    },
    [theme.breakpoints.up("lg")]: {
      width: "90%",
    },
  },
}));

const Input = ({ conversationId, otherUser }) => {
  const [state, setState] = useState({
    text: "",
  });

  const dispatch = useDispatch();

  const { root, input, iconButton } = useStyles();
  const user = useSelector((state) => state.user);

  const handleChange = (event) => {
    setState({
      text: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    await dispatch(postMessage(reqBody));
    setState({
      text: "",
    });
  };

  return (
    <Paper
      component="form"
      className={root}
      onSubmit={handleSubmit}
      rounded
      outlined
    >
      <InputBase
        classes={{ root: input }}
        disableUnderline
        placeholder="Type something..."
        value={state.text}
        name="text"
        onChange={handleChange}
      />
      <IconButton className={iconButton}>
        <SentimentSatisfiedOutlined />
      </IconButton>
      <IconButton className={iconButton}>
        <FileCopyOutlined />
      </IconButton>
    </Paper>
  );
};

export default Input;
