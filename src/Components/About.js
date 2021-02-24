import React from 'react';
import {useTranslation} from 'react-i18next';

const About = () => {
  const {t} = useTranslation();

  return (
    <section id="about">
      <svg fill="none" width="auto" height="821" viewBox="0 0 auto 821"xmlns="http://www.w3.org/2000/svg">
        <path
          d="m88.4506 7.89697c865.3484 99.23303 1937.9494 0 1937.9494 0s416.6 833.20703 77.6 809.40503-275.5-16.802-880-66.64-576.094 30.175-1012.501 66.64c-787.501 65.802-988.397-908.6378-123.0484-809.40503z"
          fill="#4e4f50"/>
      </svg>
      <div className="row">
        <div className="four columns">
          <img className="profile-pic" src={'images/profilepic.jpeg'} alt="Aurélien Vandaële Profile Pic"/>
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
                {/*<a*/}
                {/*  href={'https://media-exp1.licdn.com/dms/document/C4D2DAQEqDt8aJpXoyw/profile-treasury-document-pdf-analyzed/0/1613670069735?e=1613757600&v=beta&t=cSHs6Ra4jDcrV0TXI168ww_e_vLSm9skJZ_y-8yHm3E'}*/}
                {/*  className="button"><i className="fa fa-download"/>{t('downloadResume')}</a>*/}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
