import { notification } from 'antd';
import type { INotification } from './Notification.types';

export const Notification = ({ type, message }: INotification) => {
  notification[type]({
    message
  });
};
