import { StyledContent } from './Content.styled';
import { IContent } from './Content.types';

export const Content = ({ children }: IContent): JSX.Element => (
  <StyledContent>{children}</StyledContent>
);
