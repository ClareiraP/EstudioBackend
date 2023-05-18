const { STATUS } = require('../constants/api.constants');
const { HTTPError } = require('../utils/errors.utils');
const UsersDAO = require('../models/daos/users.dao');
const assingCartUser = require('./users.services');
const { sendEmail } = require('../utils/email.utils');

const usersDAO = new UsersDAO()


const register = async (fullName, email, password, phone) => {
  const user = await usersDAO.save({
    fullName,
    email,
    password,
    phone
  })

  const newUser = await assingCartUser(user._id)

  newUser.password = undefined

  // Send confirmation email
  const emailOptions = {
    subject: 'New Register',
    html: `
    <H1>We have a new Register in the App!</h1>
    <p>Details of the new User:</p>
    <ul>
        <li><strong>Name:</strong> ${newUser.fullName}</li>
        <li><strong>Email:</strong> ${newUser.email}</li>
        <li><strong>Phone:</strong> ${newUser.phone}</li>
      </ul>
 ` }
  await sendEmail(emailOptions)

  return newUser
}


const login = async (email, password) => {
  if (!email || !password) {
    const message = "Please enter an email and password"
    throw new HTTPError(STATUS.BAD_REQUEST, message)
  }
  const user = await usersDAO.getByEmail(email)
  const isMatch = await user.matchPasswords(password, user.password)

  if (!isMatch) {
    const message = 'Email or password incorrect'
    throw new HTTPError(STATUS.UNAUTHORIZED, message)
  }

  user.password = undefined
  return user
}

module.exports = {
  register,
  login
}