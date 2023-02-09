import React from 'react';
import {useTranslation} from 'react-i18next';

const About = () => {
  const {t} = useTranslation();

  return (
    <section id="about">
      {/*<svg fill="none" width="auto" height="821" viewBox="0 0 auto 821"xmlns="http://www.w3.org/2000/svg">*/}
      {/*  <path*/}
      {/*    d="m88.4506 7.89697c865.3484 99.23303 1937.9494 0 1937.9494 0s416.6 833.20703 77.6 809.40503-275.5-16.802-880-66.64-576.094 30.175-1012.501 66.64c-787.501 65.802-988.397-908.6378-123.0484-809.40503z"*/}
      {/*    fill="#4e4f50"/>*/}
      {/*</svg>*/}
      <div className="row">
        <div className="four columns">
          <img className="profile-pic" src={'images/profilepic.jpeg'} alt="Aurélien Vandaële Profile Pic"/>
        </div>
        <div className="seven columns main-col">
          <h2>{t('whoAmI')}</h2>

          <p>{t('bio1')}</p>
          <p>{t('bio2')}</p>
          <p>{t('bio3')}</p>
        </div>
      </div>

    </section>
  );
};

export default About;
