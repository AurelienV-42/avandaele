"use client";
import { useState } from "react";

const Text = ({
  txt,
  onClick,
  selected,
  style,
}: {
  txt: string;
  onClick?: () => void;
  selected?: boolean;
  style?: string;
}) => (
  <p
    onClick={onClick}
    className={`cursor-pointer text-sm duration-500 underline-offset-4 ${selected ? "text-white" : "text-zinc-500 hover:text-zinc-300"} ${style}`}
  >
    {txt}
  </p>
);

const Languages = ({ textStyle }: { textStyle?: string }) => {
  const [locale, setLocale] = useState<"en" | "fr">("en");

  const changeLanguage = (locale: "en" | "fr") => {
    setLocale(locale);
    console.log("change to", locale);
  };

  return (
    <div className={"flex flex-row items-center justify-center gap-2 ml-4"}>
      <Text
        style={`${locale === "fr" && "text-white"} ${textStyle}`}
        selected={locale === "fr"}
        onClick={() => changeLanguage("fr")}
        txt={"FR"}
      />
      <Text style={textStyle} txt={"|"} />
      <Text
        style={`${locale === "en" && "text-white"} ${textStyle}`}
        selected={locale === "en"}
        onClick={() => changeLanguage("en")}
        txt={"EN"}
      />
    </div>
  );
};

export default Languages;
