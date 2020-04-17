import React from 'react';

const Index = () => {
  return (
    <div>
      <p className="text-base font-bold text-purple-900 m-3">
        Uma forma de ajudar o controle da doença é saber onde ela está.
      </p>
      <p className="text-base font-bold text-purple-900 m-3">
        E se você soubesse como as pessoas ao seu redor estivessem?
      </p>
      <p className="text-base font-bold text-purple-900 m-3 mb-20">
        Você pode compartilha como você está hoje e só assim consegue visualizar
        as pessoas a sua volta de forma anônima e você vai aparecer de forma
        anônima para os outros usùarios.
      </p>

      <h1 className="text-xl font-bold  text-center m-3">
        Mantenha-se protegido. Sua comunidade também.
      </h1>
      <h1 className="text-xl font-bold text-center m-3">
        Compartilhe como você está.
      </h1>
      <h1 className="text-xl font-bold text-center m-3">
        Veja como pessoas a seu redor estão
      </h1>
      <a
        href="/api/login"
        className="py-3 text-base  rounded bg-purple-900 hover:bg-purple-800 text-white font-bold shadow-xl block w-1/4 text-center mx-auto"
      >
        Comece aqui
      </a>
    </div>
  );
};

export default Index;
