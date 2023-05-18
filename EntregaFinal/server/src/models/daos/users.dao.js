const MongoContainer = require('../containers/mongo.containers')
const UserSchema = require('../schemas/user.schema');
const { HTTPError } = require('../../utils/errors.utils');
const { STATUS } = require('../../constants/api.constants')


const collection = 'users'

class UsersDAO extends MongoContainer {
  constructor() {
    super(collection, UserSchema)
  }

  async getByEmail(email) {
    const user = await this.model.findOne({ email }, { __v: 0 })
    if (!user) {
      const message = `User with email ${email} doesn't exist`
      throw new HTTPError(STATUS.NOT_FOUND, message)
    }
    return user

  }
}

module.exports = UsersDAO;