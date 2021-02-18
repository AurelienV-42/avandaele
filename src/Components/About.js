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
                  href={'https://media-exp1.licdn.com/dms/document/C4D2DAQEqDt8aJpXoyw/profile-treasury-document-pdf-analyzed/0/1613670069735?e=1613757600&v=beta&t=cSHs6Ra4jDcrV0TXI168ww_e_vLSm9skJZ_y-8yHm3E'}
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
