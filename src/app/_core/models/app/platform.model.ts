import { DeviceSizeEnum } from '@core/enums';

export interface Platform {
  windowWidth: number;
  windowHeight: number;
  platform: string;
  platformName: string;
  platformVersion: string;
  deviceSize: DeviceSizeEnum;
  viewSize: 'small' | 'large';
  // deviceSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // Nuevo property para el tamaño del dispositivo
}
