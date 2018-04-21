import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

@Entity()
export class Device {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: DeviceType;

  @Column()
  token: string;

  @Column()
  userId: number;

  @ManyToOne(type => User, user => user.devices)
  user: User;
}
