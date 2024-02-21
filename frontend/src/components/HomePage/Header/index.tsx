// Header.tsx
import React, { ReactNode } from 'react';
import NavBar from '../Header/Navbar';
import ResponsiveAppBar from './Navbar';

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <ResponsiveAppBar/>
      {children}
    </>
  );
};

export default Header;
