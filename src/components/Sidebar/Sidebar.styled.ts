import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  height: 100vh;
  padding: 5px;
  margin: 5px 0 5px 5px;
  font-weight: 400;
`;

export const StyledMenu = styled(Menu)`
  margin-top: 25px;
`;
