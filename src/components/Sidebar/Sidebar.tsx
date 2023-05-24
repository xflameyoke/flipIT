import type { MenuProps } from 'antd';
import { ContainerOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { StyledMenu, StyledSider } from './Sidebar.styled';

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: '1',
      icon: <ContainerOutlined />,
      label: 'Flashcards',
      onClick: () => navigate('/')
    }
  ];

  return (
    <nav>
      <StyledSider>
        <StyledMenu items={items} />
      </StyledSider>
    </nav>
  );
};
