let onlineUsers = [];
const addOnlineUser = (userId, socketId) => {
  let userExist = false;
  if (onlineUsers.length > 0) {
    userExist = onlineUsers.some((user) => user.userId === userId);
  }

  if (!userExist) onlineUsers.push({ userId, socketId });
};

const removeOnlineUser = (userId) => {
  onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
};

const getOnlineUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

module.exports = {
  addOnlineUser,
  removeOnlineUser,
  getOnlineUser,
};
