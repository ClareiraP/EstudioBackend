const { STATUS } = require('../constants/api.constants');
const { succesResponse } = require('../utils/errors.utils');
const { HTTPError } = require('../utils/errors.utils');
const { getMessages, getMessageByEmail, saveMessage } = require('../services/messages.services');


class MessageController {
    async getAllMessages(req, res, next) {
        try {
            const messages = await getMessages()
            const response = succesResponse(messages)
            res.status(STATUS.OK).json(response)
          } catch (err) {
            next(new HTTPError(STATUS.BAD_REQUEST, "Sorry, we don't found any message to show you"))
          }
        }

    async getMessagesByUserEmail(req, res) {
        const { email } = req.params
        try {
            const message = await getMessageByEmail(email);
            const response = succesResponse(message)
            res.status(STATUS.OK).json(response)
          } catch (err) {
            next(new HTTPError(STATUS.BAD_REQUEST, "Opss, we don't found any message from this user"))
          }
        }

    async createMessage(req, res) {
        try {
            const newMessage = await saveMessage(req.body)
            const response = succesResponse(newMessage)
            res.status(STATUS.OK).json(response)
          } catch (err) {
            next(new HTTPError(STATUS.BAD_REQUEST))
          }
        }
}

module.exports = MessageController