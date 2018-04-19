import * as Sequelize from 'Sequelize';
import { default as Database } from '../database/index';
import { User, UserAttributes } from './User';

export interface DeviceAttributes {
  id?: number;
  type: DeviceType;
  token?: string;
  userId: number;
  user?: UserAttributes;
  updatedAt?: string;
  createdAt?: string;
}

export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

/** Many to One Relationship with User */
export const Device = Database.sequelize.define<DeviceAttributes, DeviceAttributes>('devices', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['web', 'ios', 'android']],
    },
  },
  token: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
