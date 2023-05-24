import { StyledFooter } from './Footer.styled';

export const Footer = (): JSX.Element => {
  const data = new Date().getFullYear();
  return <StyledFooter>{data}</StyledFooter>;
};
