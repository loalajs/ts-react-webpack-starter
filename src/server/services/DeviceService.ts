import { DeviceType, DeviceAttributes, Device } from '../models/Device';

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
  Promise<DeviceAttributes | null> {
    return await Device.findOne({
      where: {
        userId,
        type: deviceType,
      },
    });
  }

  public async createDevice(userId: number, deviceType: DeviceType):
  Promise<DeviceAttributes> {
    return await Device.create({
      userId,
      type: deviceType,
    });
  }
}
