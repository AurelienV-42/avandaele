import React from 'react';
import {useTranslation} from 'react-i18next';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

const Resume = () => {
  const {t, i18n} = useTranslation();
  const locale = i18n.language === 'fr' ? fr : en;

  let education = locale.resumeTab.education.map((education) => {
    return <div key={t(education.school)}><h3>{t(education.school)}</h3>
      <p className="info">{t(education.degree)} <span>&bull;</span><em className="date">{t(education.graduated)}</em></p>
      <p>{t(education.description)}</p></div>;
  });
  let work = locale.resumeTab.work.map((work) => {
    return <div key={work.company}><h3>{t(work.company)}</h3>
      <p className="info">{t(work.title)}{t(work.title) && <span>&bull;</span>} <em className="date">{t(work.years)}</em></p>
      <p>{t(work.description)}</p>
    </div>;
  });
  let skills = locale.resumeTab.skills.map((skills) => {
    var className = 'bar-expand ' + t(skills.name).toLowerCase();
    return <li key={t(skills.name)}><span style={{width: t(skills.level)}}
  className={className}/><em>{t(skills.name)}</em></li>;
  });

  return (
    <section id="resume">
      <div className="row work">
        <div className="three columns header-col">
          <h1><span>{t('work')}</span></h1>
        </div>
        <div className="nine columns main-col">
          {work}
        </div>
      </div>
      <div className="row education">
        <div className="three columns header-col">
          <h1><span>{t('education')}</span></h1>
        </div>
        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">
              {education}
            </div>
          </div>
        </div>
      </div>
      <div className="row skill">
        <div className="three columns header-col">
          <h1><span>{t('skills')}</span></h1>
        </div>
        <div className="nine columns main-col">
          <div className="bars">
            <ul className="skills">
              {skills}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
