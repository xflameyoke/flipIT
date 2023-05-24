import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Sidebar, Footer, Header, Content } from 'components';

export const BaseLayout = (): JSX.Element => (
  <Layout>
    <Sidebar />
    <Layout>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  </Layout>
);
