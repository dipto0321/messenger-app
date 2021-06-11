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

router.post("/updateSeenStatus", async (req, res, next) => {
  try {
    const { messageId } = req.query;

    const oldLastMessage = await Message.findOne({
      where: {
        lastMessageSeen: true,
      },
    });
    console.log(
      "🚀 ~ file: message.js ~ line 56 ~ Message.update= ~ oldLastMessage",
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
