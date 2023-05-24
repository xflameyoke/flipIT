import { ConfigProviderProps } from 'antd/es/config-provider';
import { colors } from './colors';

export const componentsTheme: ConfigProviderProps['theme'] = {
  token: {
    colorPrimary: colors.purple
  },
  components: {
    Layout: {
      colorBgHeader: colors.white
    },
    Menu: {
      colorBgContainer: colors.purple,
      colorItemTextHover: colors.purple
    },
    Form: {
      fontSize: 16
    }
  }
};
