"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";


const Navbar = ({currentWeek}: {currentWeek: IWeek | null}) => {

  const [navbarOpen, setNavbarOpen] = useState(false);

  const navLinks: INavLink[] = [
    {
      title: "All",
      path: `/`,
    },
    {
      title: "Week",
      path: `/week/${currentWeek && currentWeek.id}`,
    },
  ];

  return (
    <nav className="fixed mx-auto min-h-16 border-b border-text1-300 top-0 left-0 right-0 z-10 bg-white">
      <div className="flex w-full lg:py-4 items-center justify-center px-4 lg:px-8 py-2">
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-2 py-1 border rounded text-slate-200 hover:text-white hover:border-white"
            >
             <Bars3Icon className="h-5 w-5" /> 
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-2 py-1 border rounded text-slate-200 hover:text-white hover:border-white"
            >
            <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;

