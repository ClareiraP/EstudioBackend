const MongoContainer = require('../containers/mongo.containers');
const {HTTPError} = require('../../utils/errors.utils')
const { STATUS } = require('../../constants/api.constants')
const MessageSchema = require('../schemas/messages.schema')

const collection='messages'

class MessageDAO extends MongoContainer {
    constructor(){
        super(collection, MessageSchema);
    }
    
      async getMessagesByEmail(email) {
        const documents = await this.model.find({ author: email }, { __v: 0 });
        if (documents.length === 0) {
          const message = `No messages found for user with email ${email}`;
          throw new HTTPError(STATUS.NOT_FOUND, message);
        }
        return documents;
      }
    }
    
    module.exports = MessageDAO;