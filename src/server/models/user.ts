import * as Sequelize from 'Sequelize';
import { default as Database } from '../database/index';
import { Device } from './Device';

export interface UserAttributes {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  displayName?: string;
  updatedAt?: string;
  createdAt?: string;
}

export const User = Database.sequelize.define<UserAttributes, UserAttributes>('users', {
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

User.hasMany(Device, { foreignKey: 'userId', sourceKey: 'id' });

