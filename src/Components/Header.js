import React from 'react';
import {useTranslation} from 'react-i18next';
import {socials, maltIcon} from '../configSocials';

const Header = () => {
  const {t, i18n} = useTranslation();

  const changeLocale = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };
  return (
    <header id="home">
      <nav id="nav-wrap">
        <a className="mobile-btn" href={'#nav-wrap'} title="Show navigation">Show navigation</a>
        <a className="mobile-btn" href={'#home'} title="Hide navigation">Hide navigation</a>
        <ul id="nav" className="nav">
          <li className="current"><a className="smoothscroll" href="#home">Home</a></li>
          <li><a className="smoothscroll" href={'#about'}>{t('about')}</a></li>
          <li><a className="smoothscroll" href={'#resume'}>{t('resume')}</a></li>
          {/*<li><a className="smoothscroll" href="#portfolio">Works</a></li>*/}
          <li><a className="smoothscroll" href={'#testimonials'}>{t('testimonials')}</a></li>
          <li><a onClick={() => {
            changeLocale(i18n.language === 'fr' ? 'en' : 'fr');
          }} className="smoothscroll" href="#home">{i18n.language === 'fr' ? 'English' : 'French'}</a></li>
        </ul>
      </nav>

      <div className="row banner">
        <div className="banner-text">
          <h1 className="responsive-headline">{t('titleHeader')}</h1>
          <h3><span>{t('bodyHeaderMark')}</span>{t('bodyHeader')}</h3>
          <ul className="social">
            {socials.map(item => {
              return (<li key={item.name}>
                  <a href={item.url} className={item.className} target="_blank">
                    {item.name === 'malt' && maltIcon}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="scrolldown">
        <a className="smoothscroll" href={'#about'}><i className="icon-down-circle"/></a>
      </p>
    </header>
  );
};

export default Header;
