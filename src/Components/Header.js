import React, { Component } from 'react';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEnglish: true,
        };
    }

    render() {
        const {data} = this.props;

        if(data){
            var name = data.name;
            var occupation= data.occupation;
            var description= data.description;
            var state= data.address.state;
            var networks= data.social.map(function(network){
                return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
            });
        }

        return (
            <header id="home">
                <nav id="nav-wrap">
                    <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
                    <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
                    <ul id="nav" className="nav">
                        <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
                        <li><a className="smoothscroll" href="#about">About</a></li>
                        <li><a className="smoothscroll" href="#resume">Resume</a></li>
                        {/*<li><a className="smoothscroll" href="#portfolio">Works</a></li>*/}
                        <li><a className="smoothscroll" href="#testimonials">Testimonials</a></li>
                        {this.state.isEnglish === true && <li><a onClick={() => { this.props.changeLanguage(); this.setState({isEnglish: false})}} className="smoothscroll" href="#home">French</a></li>}
                        {this.state.isEnglish === false &&<li><a onClick={() => { this.props.changeLanguage(); this.setState({isEnglish: true})}} className="smoothscroll" href="#home">English</a></li>}
                    </ul>
                </nav>

                <div className="row banner">
                    <div className="banner-text">
                        {this.props.language === 'en' && <h1 className="responsive-headline">I'm {name}.</h1>}
                        {this.props.language === 'fr' && <h1 className="responsive-headline">Je suis {name}.</h1>}
                        {this.props.language === 'en' && <h3>I'm a {state} based <span>{occupation}</span>. {description}.</h3>}
                        {this.props.language === 'fr' && <h3><span>{occupation}</span> basé en {state}. {description}.</h3>}
                        <hr />
                        <ul className="social">
                            {networks}
                        </ul>
                    </div>
                </div>

                <p className="scrolldown">
                    <a className="smoothscroll" href="#about"><i className="icon-down-circle"></i></a>
                </p>
            </header>
        );
    }
}

export default Header;
