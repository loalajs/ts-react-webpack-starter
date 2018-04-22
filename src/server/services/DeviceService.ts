import { DeviceType, Device } from '../models/Device';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

export class DeviceService {
  public isDeviceSupport(userDevice: string): boolean {
    if (userDevice !== DeviceType.ANDROID
      && userDevice !== DeviceType.WEB
      && userDevice !== DeviceType.IOS) {
      return false;
    }
    return true;
  }

  public async getOne(userId: number, deviceType: DeviceType):
  Promise<Device | undefined> {
    const device = await getRepository(Device).findOne({
      where: {
        userId,
        type: deviceType,
      },
    });
    return device;
  }

  public async createDevice(user: User, deviceType: DeviceType):
  Promise<Device | undefined> {
    const device = new Device();
    device.type = deviceType;
    device.user = user;
    device.userId = user.id;
    return await getRepository(Device).save(device);
  }
}
