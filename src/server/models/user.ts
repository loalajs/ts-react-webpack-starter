import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Device } from './Device';

export interface UserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  displayName: string;
  updatedAt?: string;
  createdAt?: string;
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @OneToMany(type => Device, device => device.user)
  devices: Device[];
}
