import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { useDispatch } from "react-redux";
import { readAllMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
  count: {
    padding: "5px 11px",
    backgroundColor: "#3A8DFF",
    borderRadius: 20,
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    marginRight: "1.5rem",
    marginBottom: ".625rem",
  },
}));

const Chat = ({ conversation }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClick = async () => {
    await dispatch(setActiveChat(conversation.otherUser.username));
    await dispatch(
      readAllMessages({
        conversationId: conversation.id,
        recipientId: conversation.otherUser.id,
      })
    );
  };

  useEffect(() => {
    if (conversation.unReadMessage > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [conversation]);

  const { root, count } = useStyles();
  const { photoUrl, username, online } = conversation.otherUser;

  return (
    <Box onClick={handleClick} className={root}>
      <BadgeAvatar
        photoUrl={photoUrl}
        username={username}
        online={online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {show && <span className={count}>{conversation.unReadMessage}</span>}
    </Box>
  );
};

export default Chat;
