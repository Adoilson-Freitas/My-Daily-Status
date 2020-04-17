import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="p-2 hover:underline hover:text-red-800">{children}</a>
    </Link>
  );
};

const NavBar = () => {
  return (
    <div className="bg-purple-900 py-4 text-center text-white">
      <NavLink href="/">Home</NavLink>
      <NavLink href="/app">Status</NavLink>
      <NavLink href="/api/login">Entrar</NavLink>
      <NavLink href="/create-status">Cadastrar status</NavLink>
    </div>
  );
};

export default NavBar;
