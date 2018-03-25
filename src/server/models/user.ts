import * as Sequelize from 'Sequelize';
import { sequelize } from 'database';

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

export default User;
