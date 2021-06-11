import axios from "axios";
import socket from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  updateConversationUnReadCounter,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";

axios.interceptors.request.use(async function (config) {
  const token = await sessionStorage.getItem("messenger-token");
  config.headers["X-CSRF-Token"] = token;

  return config;
});

export const getCsrfToken = async () => {
  const { data } = await axios.get("/auth/csrf-token");
  sessionStorage.setItem("messenger-token", data.csrfToken);
};

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    dispatch(gotUser({}));
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

const validConversation = async (reqBody) => {
  const { senderId, recipientId } = reqBody;
  const {
    data: { isValid },
  } = await axios.get(
    `/api/messages/validConversation?senderId=${senderId}&recipientId=${recipientId}`
  );

  return isValid;
};

const saveMessageSeen = async (messageId) => {
  const { data } = await axios.post(
    `/api/messages/updateSeenStatus?${messageId}`
  );
  return data;
};

const sendMessage = async (data, body) => {
  const isValid = await validConversation({
    senderId: data.message.senderId,
    recipientId: body.recipientId,
  });
  if (isValid) {
    socket.emit("new-message", {
      message: data.message,
      recipientId: body.recipientId,
      sender: data.sender,
    });
  }
};

// message format to send: {recipientId, text, conversationId}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);
    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};

export const readAllMessages = (reqBody) => async (dispatch) => {
  try {
    const { conversationId, recipientId } = reqBody;
    const {
      data: { updateStatus, lastMessageIdByOtherUser },
    } = await axios.post(
      `/api/messages/readAllMessages?conversationId=${conversationId}&recipientId=${recipientId}`
    );

    if (updateStatus === "success") {
      const response = saveMessageSeen(lastMessageIdByOtherUser);
      console.log(
        "🚀 ~ file: thunkCreators.js ~ line 140 ~ readAllMessages ~ response",
        response
      );
      socket.emit("read-msg", {
        messageId: lastMessageIdByOtherUser,
        recipientId,
        conversationId,
      });
      dispatch(updateConversationUnReadCounter(conversationId, 0));
    }
  } catch (error) {
    console.error(error);
  }
};
