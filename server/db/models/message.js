const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  readStatus: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Message.updateAll = async (
  conversationId,
  recipientId,
  fieldToUpdate,
  updateValue
) => {
  try {
    const messages = await Message.findAll({
      where: {
        senderId: recipientId,
        conversationId: conversationId,
      },
    });
    messages.forEach(async (message) => {
      message[fieldToUpdate] = updateValue;
      await message.save({ fields: [fieldToUpdate] });
      await message.reload();
    });
    return { updateStatus: "success" };
  } catch (error) {
    return { updateStatus: "failed" };
  }
};

module.exports = Message;
