import React from 'react';

import NavBar from './NavBar';

const Header = () => {
  return (
    <div className="bg-purple-400">
      <h1>
        <img className="h-24 mx-auto py-4" src="/logo.png" alt="MyDailStatus" />
      </h1>
      <NavBar />
    </div>
  );
};

export default Header;
