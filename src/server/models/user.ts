import * as Sequelize from 'Sequelize';
import { sequelize } from '../database';

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  displayName: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Invalid email.',
      },
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

export default User;
