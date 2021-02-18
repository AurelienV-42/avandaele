import React from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import {useTranslation} from 'react-i18next';

const Testimonials = () => {
  const {t, i18n} = useTranslation();
  const locale = i18n.language === 'fr' ? fr : en;

  let testimonials = locale.testimonialsTab.map((testimonials) => {
    return <li key={testimonials.user}>
      <blockquote>
        <p>{testimonials.text}</p>
        <cite>{testimonials.user}</cite>
      </blockquote>
    </li>;
  });

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">

          <div className="two columns header-col">
            <h1><span>{t('clientTestimonials')}</span></h1>
          </div>

          <div className="ten columns flex-container">
            <ul className="slides">
              {testimonials}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
