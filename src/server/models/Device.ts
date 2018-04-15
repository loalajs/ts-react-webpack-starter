import * as Sequelize from 'Sequelize';
import { Database } from '../database';
import { User, UserParams } from './User';

export interface DeviceParams {
  id?: number;
  type: DeviceType;
  token?: string;
  userId: number;
  user?: UserParams;
  updatedAt?: string;
  createdAt?: string;
}

export enum DeviceType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

/** Many to One Relationship with User */
const Device = Database.connection().define<DeviceParams, DeviceParams>('devices', {
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

export { Device };
