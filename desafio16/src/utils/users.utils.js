const moment = require('moment');

const formatUserForDB = (userObj) => {
  const birthdate = moment(userObj.birthday, "MMMM DD, YYYY").startOf('day');
  const newUser = {
    firstname: userObj.firstname,
    lastname: userObj.lastname,
    birthdate: birthdate.format('DD-MM-YYYY'),
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date(),
    accounts: null
  };
  return newUser;
};

module.exports = {
  formatUserForDB,
}