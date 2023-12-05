import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.main`
  flex-grow: 1;
  padding: 20px;
`;

const Layout = () => {
  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </PageContainer>
  );
};

export default Layout;
