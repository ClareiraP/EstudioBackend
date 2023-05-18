const { Router } = require('express')
const MessageController = require('../../controllers/message.controller');

const messageController = new MessageController()

const router= Router();


router.get("/messages", messageController.getAllMessages);
router.get("/messaes/user/:id", messageController.getMessagesByUserEmail);
router.post("/", messageController.createMessage);

module.exports = router;