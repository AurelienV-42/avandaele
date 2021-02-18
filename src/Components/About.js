import React from 'react';
import {useTranslation} from 'react-i18next';

const About = () => {
  const {t} = useTranslation();

  return (
    <section id="about">
      <div className="row">
        <div className="four columns">
          <img className="profile-pic" src={'images/profilepic.png'} alt="Aurélien Vandaële Profile Pic"/>
        </div>
        <div className="seven columns main-col">
          <h2>{t('whoAmI')}</h2>

          <p>{t('bio')}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>{t('contacts')}</h2>
              <p className="address">
                <span>Aurélien Vandaële</span><br/>
                <span>16 rue des Martyrs de la Résistance<br/>
                  Seclin France, 59113
                                </span><br/>
                <span>aurelienvpro@gmail.com</span>
              </p>
            </div>
            <div className="columns download">
              <p>
                <a
                  href={'https://media-exp1.licdn.com/dms/document/C562DAQEFe87AA3lmoA/profile-treasury-document-pdf-analyzed/0/1583550113242?e=1613743200&v=beta&t=wlw12NlKpePyh5YV_XspTvBYy31TNW5g83a1yOiMVSI'}
                  className="button"><i className="fa fa-download"/>{t('downloadResume')}</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
