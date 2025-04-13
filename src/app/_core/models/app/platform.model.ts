import { DeviceSizeEnum, ViewSizeEnum } from '@core/enums';

export interface Platform {
  windowWidth: number;
  windowHeight: number;
  platform: string;
  platformName: string;
  platformVersion: string;
  deviceSize: DeviceSizeEnum;
  viewSize: ViewSizeEnum;
}
