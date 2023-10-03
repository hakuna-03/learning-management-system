const showUsers = require('./showUsers')

module.exports = {
    "/admin/users": {
      ...showUsers,
    },
  };
  