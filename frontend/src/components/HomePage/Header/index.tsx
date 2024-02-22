// Header.tsx
import React, { ReactNode } from 'react';
import NavBar from '../Header/Navbar';
import ResponsiveAppBar from './Navbar';
import MyRoutes from '../../../routes/MyRoutes';

interface HeaderProps {
  children: ReactNode;
}

const Header= () => {
  return (
    <>
      <ResponsiveAppBar/>
      <MyRoutes></MyRoutes>
    </>
  );
};

export default Header;
