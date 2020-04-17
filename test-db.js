const admin = require('firebase-admin');
const { GeoFirestore } = require('geofirestore');
const secret = require('./firebase-secret.json');

admin.initializeApp({
  credential: admin.credential.cert(secret),
});

const db = admin.firestore();
const dbgeo = new GeoFirestore(db);

dbgeo
  .collection('test')
  .add({
    teste: 1,
    coordinates: new admin.firestore.GeoPoint(-12.0923173, -38.9839643),
  })
  .then(() => {
    console.log('ok');
  });
