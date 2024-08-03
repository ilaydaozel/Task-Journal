"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";


const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false);
  const navLinks: INavLink[] = [
    {
      title: "Tasks",
      path: "",
    },
  ];

  return (
    <nav className="fixed mx-auto border-b border-text1-300 top-0 left-0 right-0 z-20 bg-primary-800 bg-opacity-90">
      <div className="flex w-full lg:py-4 items-center justify-between px-4 lg:px-8 py-2">
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
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
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

