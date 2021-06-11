const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { getOnlineUser } = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (getOnlineUser(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

router.get("/validConversation", async (req, res, next) => {
  try {
    const { senderId, recipientId } = req.query;
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );
    const isValid = conversation && Object.entries(conversation).length !== 0;
    res.json({ isValid });
  } catch (error) {
    next(error);
  }
});

router.put("/markAllRead", async (req, res, next) => {
  try {
    const { conversationId, recipientId } = req.query;

    const messages = await Message.findAll({
      where: {
        senderId: recipientId,
        conversationId: conversationId,
        readStatus: false,
      },
      order: [["createdAt", "DESC"]],
    });

    if (messages.length > 0) {
      messages.forEach(async (message) => {
        message.readStatus = true;
        await message.save({ fields: ["readStatus"] });
        await message.reload();
      });
      res.json({
        updateStatus: "success",
        lastMessageIdByOtherUser: messages[0].id,
      });
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

router.put("/updateSeenStatus", async (req, res, next) => {
  try {
    const { messageId, recipientId } = req.query;
    console.log(
      "🚀 ~ file: messages.js ~ line 98 ~ router.post ~ req.query",
      req.query
    );

    const oldLastMessage = await Message.findOne({
      where: {
        lastMessageSeen: true,
        senderId: recipientId,
      },
    });
    console.log(
      "🚀 ~ file: messages.js ~ line 104 ~ router.post ~ oldLastMessage",
      oldLastMessage
    );

    if (oldLastMessage) {
      oldLastMessage.lastMessageSeen = false;
      await oldLastMessage.save({ fields: ["lastMessageSeen"] });
      await oldLastMessage.reload();
    }

    const newLastMessage = await Message.findOne({
      where: {
        id: messageId,
      },
    });

    if (newLastMessage) {
      newLastMessage.lastMessageSeen = true;
      await newLastMessage.save({ fields: ["lastMessageSeen"] });
      await newLastMessage.reload();
      res.json({ status: "success" });
    } else {
      res.json({});
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
