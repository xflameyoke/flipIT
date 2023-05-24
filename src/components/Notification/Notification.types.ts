import { ReactNode } from 'react';

export type INotification = {
  type: 'success' | 'info' | 'warning' | 'error';
  message: ReactNode;
};
