import React from 'react';

import '../styles/styles.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const App = ({ Component, pageProps }) => {
  return (
    <div className="bg-purple-200">
      <Header />
      <div className="min-h-screen container mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
