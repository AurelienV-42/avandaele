import React from 'react';
import {socials, maltIcon} from '../configSocials';
import {useTranslation} from 'react-i18next';


const Footer = () => {
  const {t} = useTranslation();

  return (
    <footer>
        <h5>{t('designBy')}</h5>
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
      <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a>
      </div>

    </footer>
  );
};

export default Footer;
