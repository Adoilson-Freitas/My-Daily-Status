import React, { useState } from 'react';
import { IoMdLogOut } from 'react-icons/io';
import axios from 'axios';
import auth0 from '../lib/auth0';

const CreateStatus = (props) => {
  const [dados, setDados] = useState({
    status: 'bem',
    coords: {
      lat: null,
      long: null,
    },
  });
  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDados((old) => {
          return {
            ...old,
            coords: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          };
        });
      });
    }
  };
  const onStatusChange = (evt) => {
    const { value } = evt.target;
    setDados((old) => {
      return {
        ...old,
        status: value,
      };
    });
  };

  const save = async () => {
    await axios.post('/api/save-status', dados);
  };
  return (
    <div>
      <div className="mt-2 mb-4 flex flex-row-reverse items-center">
        <img
          src={props.user.picture}
          className="mx-2 w-10 rounded-full"
          alt="perfil"
        />
        <h3 className="mr-1">{props.user.name}</h3>
        <a href="/api/logout">
          <IoMdLogOut color="red" size={22} />
        </a>
      </div>
      <table className="table-auto">
        <thead>
          <tr className="bg-purple-800 text-white">
            <th className="w-1/2 px-4 py-2">Sintomas</th>
            <th className="w-1/4 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-400">
            <td className="border px-4 py-2 font-bold">Sem Simtomas</td>
            <td className="border px-4 py-2">
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="bem"
                  onClick={onStatusChange}
                />{' '}
                Estou bem e sem simtomas.
              </label>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">
              <srong className="font-bold">
                E os sintomas mais comuns do resfriado são:
              </srong>{' '}
              tosse, congestão nasal, coriza, dor no corpo e leve dor de
              garganta
            </td>
            <td className="border px-4 py-2">
              {' '}
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="resfrado"
                  onClick={onStatusChange}
                />{' '}
                Estou com sintomas de Resfrado.
              </label>{' '}
            </td>
          </tr>

          <tr className="bg-gray-400">
            <td className="border px-4 py-2">
              <srong className="font-bold">
                Os principais sintomas da gripe são:
              </srong>{' '}
              febre, dor no corpo, dor de cabeça e tosse seca
            </td>
            <td className="border px-4 py-2">
              {' '}
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="gripe"
                  onClick={onStatusChange}
                />{' '}
                Estou com sintomas de gtipe.
              </label>{' '}
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-2">
              <srong className="font-bold">
                De acordo com o Grinbaum e com o alergista Marcello Bossois, os
                sinais de alerta para os casos mais graves, que precisam de
                cuidados médicos, são:
              </srong>{' '}
              febre alta, falta de ar com respiração curta, pressão baixa como
              consequência da infecção, calafrio e batimento de asa do nariz
              (esforço para respirar que leva a uma movimentação das narinas)
            </td>
            <td className="border px-4 py-2">
              <label className="block">
                <input
                  type="radio"
                  name="status"
                  value="covid"
                  onClick={onStatusChange}
                />{' '}
                Estou com sintomas da COVID
              </label>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        font:{' '}
        <a
          className="text-blue-700"
          href="https://g1.globo.com/bemestar/coronavirus/noticia/2020/03/21/covid-19-gripe-resfriado-e-alergias-tem-sintomas-parecidos-mas-duracao-e-evolucao-sao-diferentes.ghtml"
        >
          g1.globo.com
        </a>
      </p>
      <button
        className="py-2 mb-5 text-base  rounded bg-purple-900 hover:bg-purple-800 text-white font-bold shadow-xl block w-1/4 text-center mx-auto"
        type="button"
        onClick={getMyLocation}
      >
        Pegar minha localização
      </button>
      Sua posição atual: <p className="text-red-900">{dados.coords.lat}</p>{' '}
      <p className="text-red-900">{dados.coords.long}</p>
      <button
        className="py-2 text-base  rounded bg-purple-900 hover:bg-purple-800 text-white font-bold shadow-xl block w-1/4 text-center mx-auto"
        type="button"
        onClick={save}
      >
        <a href="/app">Salvar meu status</a>
      </button>
    </div>
  );
};

export default CreateStatus;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    return {
      props: {
        isAuth: true,
        user: session.user,
      },
    };
  }
  return {
    props: {
      isAuth: false,
      user: {},
    },
  };
}
