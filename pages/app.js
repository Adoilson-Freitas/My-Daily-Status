import React, { useEffect } from 'react';
import router from 'next/router';
import { IoMdLogOut } from 'react-icons/io';
import auth0 from '../lib/auth0';
import { db } from '../lib/db';
import { distance } from '../lib/geo';

const App = (props) => {
  useEffect(() => {
    if (!props.isAuth) {
      router.push('/');
    } else if (props.forceCreate) {
      router.push('/create-status');
    }
  });
  if (!props.isAuth || props.forceCreate) {
    return null;
  }

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
      <h1 className="text-base text-center m-8">
        Status próximos a você em um raio de 30Km:
      </h1>
      <table className="text-center ">
        <tr className="bg-purple-800 text-white">
          <th className="w-1/3 px-4 py-2">Usuário</th>
          <th className="w-1/4 px-4 py-2">Status</th>
          <th className="w-1/3 px-4 py-2">Posição</th>
          <th className="w-1/4 px-4 py-2">Distância</th>
        </tr>
        {props.checkins.map((checkin) => {
          return (
            <>
              <tr>
                <td className="border border-gray-400 px-4 py-2 text-gray-800">
                  {checkin.id === props.user.sub ? 'Seu status:' : 'Anônimo'}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-gray-800">
                  {checkin.status}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-gray-800">
                  {checkin.distance < 10 ? 'perto' : 'longe'}
                </td>
                <td className="border border-gray-400 px-4 py-2 text-gray-800">
                  {checkin.distance}km
                </td>
              </tr>{' '}
            </>
          );
        })}
      </table>
    </div>
  );
};

export default App;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  if (session) {
    const today = new Date();
    const currentDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const todayCheckin = await db
      .collection('markers')
      .doc(currentDate)
      .collection('checks')
      .doc(session.user.sub)
      .get();

    const todaysData = todayCheckin.data();
    let forceCreate = true;
    if (todaysData) {
      forceCreate = false;
      const checkins = await db
        .collection('markers')
        .doc(currentDate)
        .collection('checks')
        .near({
          center: todaysData.coordinates,
          radius: 30000,
        })
        .get();
      const checkinsList = [];
      checkins.docs.forEach((doc) => {
        checkinsList.push({
          id: doc.id,
          status: doc.data().status,
          coords: {
            lat: doc.data().coordinates.latitude,
            long: doc.data().coordinates.longitude,
          },
          distance: distance(
            todaysData.coordinates.latitude,
            todaysData.coordinates.longitude,
            doc.data().coordinates.latitude,
            doc.data().coordinates.longitude
          ).toFixed(2),
        });
      });
      return {
        props: {
          isAuth: true,
          user: session.user,
          forceCreate: false,
          checkins: checkinsList,
        },
      };
    }

    return {
      props: {
        isAuth: true,
        user: session.user,
        forceCreate,
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
