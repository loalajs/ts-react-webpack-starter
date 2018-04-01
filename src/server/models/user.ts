import * as Sequelize from 'Sequelize';
import { Database } from '../database';
// import * as bcrypt from 'bcrypt';
// import * as bcryptPromise from 'bcrypt-promise';
// import * as jwt from 'jsonwebtoken';

export interface UserParams {
  id?: number;
  username: string;
  email: string;
  password?: string;
  displayName?: string;
  updatedAt?: string;
  createdAt?: string;
}

export const User = Database.connection().define<UserParams, UserParams>('users', {
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
