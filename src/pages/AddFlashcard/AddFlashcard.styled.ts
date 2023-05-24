import styled from 'styled-components';

export const StyledForm = styled.div`
  width: 1200px;
  margin: 50px auto;

  .editor {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
  }

  .toolbar {
    border-radius: 10px;
    margin: 10px;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};

    span {
      color: ${({ theme }) => theme.colors.black};
    }
  }

  .wrapper {
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 10px;
  }
`;
