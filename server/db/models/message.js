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
  lastMessageSeen: {
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
      order: [["createdAt", "DESC"]],
    });
    messages.forEach(async (message) => {
      message[fieldToUpdate] = updateValue;
      await message.save({ fields: [fieldToUpdate] });
      await message.reload();
    });

    return {
      updateStatus: "success",
      lastMessageIdByOtherUser: messages[0].id,
    };
  } catch (error) {
    return { updateStatus: "failed" };
  }
};

Message.update = async (messageId, updateFiled, updateValue) => {
  try {
    const message = await Message.findOne({
      where: {
        id: messageId,
      },
    });
    console.log(
      "🚀 ~ file: message.js ~ line 56 ~ Message.update= ~ message",
      message
    );
    if (message) {
      message[updateFiled] = updateValue;
      await message.save({ fields: [updateFiled] });
      await message.reload();
    }
    return message;
  } catch (error) {
    return null;
  }
};

module.exports = Message;
