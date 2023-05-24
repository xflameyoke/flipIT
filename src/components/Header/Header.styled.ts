import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 5px 0 5px;
  font-size: 36px;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.purple};
`;
