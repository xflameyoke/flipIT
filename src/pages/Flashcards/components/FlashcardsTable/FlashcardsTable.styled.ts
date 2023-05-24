import styled from 'styled-components';
import { Button } from 'antd';
import type { IProps } from './FlashcardsTable.types';

export const StyledButton = styled(Button)<IProps>`
  width: ${(props) => props?.$btnWidth || '150px'};
  margin: ${(props) => props?.$btnMargin || '0px'};
`;

export const StyledNotification = styled.div`
  display: flex;

  b {
    color: ${({ theme }) => theme.colors.purple};
    font-weight: bold;
    margin: 0 5px;
  }

  p {
    margin: 0;
    padding: 0;
  }
`;
