import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return null; 
  }

  return (
    <AdminContainer>
      <SideNav>
        <Logo>almă</Logo>
        <NavItems>
          <NavItem active={router.pathname.includes('/admin')}>Leads</NavItem>
          <NavItem active={router.pathname.includes('/settings')}>Settings</NavItem>
        </NavItems>
        <AdminInfo>
          <AdminCircle>A</AdminCircle>
          <AdminText>Admin</AdminText>
        </AdminInfo>
      </SideNav>
      <MainContent>
        {children}
      </MainContent>
    </AdminContainer>
  );
};

const AdminContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  width: 250px;
  background-color: #f8f8dc; 
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3rem;
`;

const NavItems = styled.div`
  flex-grow: 1;
`;

const NavItem = styled.div<{ active?: boolean }>`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: 1rem;
`;

const AdminCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const AdminText = styled.div`
  font-weight: 500;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
  overflow-y: auto;
`;

export default AdminLayout;
