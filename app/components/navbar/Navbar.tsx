"use client";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon, PlusCircleIcon} from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import AddTaskForm from "../forms/AddTaskForm";


const Navbar = ({currentWeek, years}: {currentWeek: IWeek | null, years: IYear[]}) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const navLinks: INavLink[] = [
    {
      title: "Year",
      path: `/`,
    },
    {
      title: "Month",
      path: `/`,
    },
    {
      title: "Week",
      path: `/week/${currentWeek && currentWeek.id}`,
    },
    {
      title: "Day",
      path: `/`,
    },
  ];

  return (
    <nav id="navbar" className="fixed mx-auto min-h-16 border-b border-text1-300 top-0 left-0 right-0 z-10 bg-white">
      <div className="flex w-full py-4 items-center justify-center px-4 lg:px-8">
        <div className="w-full smobile-menu md:hidden flex justify-between">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-2 py-1 border rounded text-text1-500 hover:text-primary-200 hover:border-primary-200"
            >
             <Bars3Icon className="h-5 w-5" /> 
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-2 py-1 border rounded text-text1-500 hover:text-primary-200 hover:border-primary-200"
            >
            <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <div className="w-fit">
                <PlusCircleIcon className='text-primary-200 h-8 w-8 hover:scale-110' onClick={openModal} />   
                <AddTaskForm isOpen={isModalOpen} onClose={closeModal} years={years} />
            </div>  
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex items-center p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <div className="w-fit">
                <PlusCircleIcon className='text-primary-200 h-8 w-8 hover:scale-110' onClick={openModal} />   
                <AddTaskForm isOpen={isModalOpen} onClose={closeModal} years={years} />
            </div>      
          </ul>
        </div>

      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;

