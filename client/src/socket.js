import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateConversationUnReadCounter,
} from "./store/conversations";

const ENDPOINT = "ws://localhost:3000";

const socket = io(ENDPOINT, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("getMessage", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
    store.dispatch(
      updateConversationUnReadCounter(data.message.conversationId, 1)
    );
  });
});

export default socket;
