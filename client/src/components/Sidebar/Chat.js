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
}));

const Chat = ({ conversation }) => {
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(
      readAllMessages({
        conversationId: conversation.id,
        recipientId: conversation.otherUser.id,
      })
    );
    await dispatch(setActiveChat(conversation.otherUser.username));
  };

  const { root } = useStyles();
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
    </Box>
  );
};

export default Chat;
