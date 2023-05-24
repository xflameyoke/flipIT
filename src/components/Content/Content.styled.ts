import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const StyledContent = styled(Content)`
  margin: 5px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.white};
`;
