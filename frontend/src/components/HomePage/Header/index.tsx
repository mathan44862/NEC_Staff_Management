// Header.tsx
import React, { ReactNode } from 'react';
import NavBar from '../Header/Navbar';

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Header;
