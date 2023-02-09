import React from 'react';
import './i18n';

import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <About/>
      <Resume/>
        <Portfolio/>
      <Testimonials/>
      <Footer/>
    </div>
  );
};

export default App;
