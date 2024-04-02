"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import routes from "@/config/routes";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [routesWithoutCurrentRoute, setRoutesWithoutCurrentRoute] =
    useState(routes);

  const url =
    typeof window !== "undefined"
      ? window.location.pathname.replace("/", "")
      : "";

  useEffect(() => {
    setRoutesWithoutCurrentRoute(
      routes.filter((route) => !route.href.includes(url)),
    );
  }, [url]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b  ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500  border-zinc-800 "
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            {routesWithoutCurrentRoute.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="duration-200 text-zinc-400 hover:text-zinc-100"
              >
                {route.name}
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100"
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
    </header>
  );
};
