let onlineUsers = [];
const addOnlineUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ userId, socketId });
};

const removeOnlineUser = (userId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== userId);
};

const getOnlineUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

module.exports = {
  addOnlineUser,
  removeOnlineUser,
  getOnlineUser,
};
