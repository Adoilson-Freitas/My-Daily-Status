import React from 'react';

const Footer = () => {
  return (
    <div className="py-4 text-center bg-purple-400">
      MyDailyStatus é um projeto criado durante o Fullstack Lab do DevPleno.
      <br />
      Impementado por:{' '}
      <a
        className="text-blue-600 hover:underline hover:text-blue-500"
        href="https://www.linkedin.com/in/adoilson-freitas-98b154172/"
      >
        Adoilson Freitas
      </a>
    </div>
  );
};

export default Footer;
