import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Testimonials from './Components/Testimonials';
// import Portfolio from './Components/Portfolio';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [resumeData, setResumeData] = useState({});

  useEffect(() => getResumeData(language));

  const getResumeData = language => {
    $.ajax({
      url: 'resumeData'+language+'.json',
      dataType:'json',
      cache: false,
      success: function(data){
        setResumeData(data);
      },
      error: (xhr, status, err) => {
        console.log(err);
        alert(err);
      }
    });
  }

  const changeLanguage = () => {
    if (!language || language === 'en') {
      getResumeData('fr');
      setLanguage('fr');
    } else {
      getResumeData('en');
      setLanguage('en');
    }
  };

    return (
      <div className="App">
        <Header data={resumeData.main} language={language} changeLanguage={changeLanguage}/>
        <About data={resumeData.main} language={language}/>
        <Resume data={resumeData.resume} language={language}/>
        {/*<Portfolio data={resumeData.portfolio}/>*/}
        <Testimonials data={resumeData.testimonials}/>
        <Footer data={resumeData.main}/>
      </div>
    );
}

export default App;
