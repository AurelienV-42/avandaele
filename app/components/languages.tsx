"use client";
import {useState} from "react";

const Text = ({txt, onPress, selected, style}: {txt: string, onPress?: () => void, selected?: boolean, style?: string}) =>
  <p onTouchStart={onPress} className={`cursor-pointer text-sm duration-500 text-zinc-500 hover:text-zinc-300 underline-offset-4 ${selected && 'underline'} ${style}`}>{txt}</p>;

const Languages = ({textStyle}: {textStyle?: string}) => {
  const [locale, setLocale] = useState<'en' | 'fr'>('en')

  const changeLanguage = (locale: 'en' | 'fr') => {
    setLocale(locale);
    console.log('change to', locale);
  }

  return <div/>; // TODO
  return (
    <div className={'flex flex-row items-center justify-center gap-2 ml-4'}>
      <Text style={textStyle} selected={locale === 'fr'} onPress={() => changeLanguage('fr')} txt={'FR'}/>
      <Text style={textStyle} txt={'|'}/>
      <Text style={textStyle} selected={locale === 'en'} onPress={() => changeLanguage('en')}  txt={'EN'}/>
    </div>
  )
}

export default Languages;
