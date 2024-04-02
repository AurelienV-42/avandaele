"use client";
import Malt from "@/public/icons/Malt";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Card } from "../components/card";
import { Navigation } from "../components/nav";

type Social = {
  icon: ReactNode;
  href: string;
  label: string;
  handle: string;
};

const socials: Social[] = [
  {
    icon: <Malt width={20} height={20} />,
    href: "https://www.malt.fr/profile/aurelienvandaele",
    label: "Malt",
    handle: "Aurélien Vandaële",
  },
  {
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/aurelien-vandaele/",
    label: "LinkedIn",
    handle: "aurelien-vandaele",
  },
  {
    icon: <Mail size={20} />,
    href: "mailto:aurelienvpro@gmail.com",
    label: "Email",
    handle: "aurelienvpro@gmail.com",
  },
  // {
  //   icon: <Github size={20} />,
  //   href: "https://github.com/aurelienv-42",
  //   label: "Github",
  //   handle: "AurelienV-42",
  // },
];

const SocialCard = ({ social }: { social: Social }) => (
  <Card>
    <Link
      href={social.href}
      target="_blank"
      className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
    >
      <span
        className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
        {social.icon}
      </span>{" "}
      <div className="z-10 flex flex-col items-center">
        <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display text-center">
          {social.handle}
        </span>
        <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {social.label}
        </span>
      </div>
    </Link>
  </Card>
);

export default function Example() {
  return (
    <div className=" bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
        <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
          {socials.map((social, index) => (
            <SocialCard key={index} social={social} />
          ))}
        </div>
      </div>
    </div>
  );
}
