import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Testimonials from './Components/Testimonials';
// import Portfolio from './Components/Portfolio';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      language: 'en',
      resumeData: {}
    };
  }

  getResumeData(language){
    $.ajax({
      url: 'resumeData'+language+'.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  changeLanguage = () => {
    if (!this.state.language || this.state.language === 'en') {
      this.getResumeData('fr');
      this.setState({language: 'fr'});
    } else {
      this.getResumeData('en');
      this.setState({language: 'en'});
    }
  };

  componentDidMount(){
    this.getResumeData(this.state.language);
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} language={this.state.language} changeLanguage={this.changeLanguage}/>
        <About data={this.state.resumeData.main} language={this.state.language}/>
        <Resume data={this.state.resumeData.resume} language={this.state.language}/>
        {/*<Portfolio data={this.state.resumeData.portfolio}/>*/}
        <Testimonials data={this.state.resumeData.testimonials}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
