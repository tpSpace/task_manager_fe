'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import CustomLink from './CustomLink';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogged(true);
    }
  }, []);

  function logout() {
    console.log('logout');
    localStorage.removeItem('token');
    setIsLogged(false);
  }

  return (
    <div className="fixed flex top-0 left-0 right-0 z-20 h-12 md:h-16 justify-between items-center py-4 px-2 sm:px-4 bg-black">
      <div className="flex flex-row items-center justify-center">
        <Image
          alt="Logo"
          className="h-8 sm:h-12 sm:ml-2 cursor-pointer"
          height={65}
          onClick={() => {
            window.location.href = '/';
          }}
          src="/logo.svg"
          width={65}
        />
        <CustomLink
          containerStyles="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl text-white font-Montserrat"
          route="/"
          title="TasKing"
        />
      </div>
      {!isLogged && (
        <div className="flex gap-2 sm:gap-4">
          <CustomLink
            containerStyles="text-white text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-3 xl:px-4 py-2 font-semibold rounded-full hover:bg-white hover:text-black font-Roboto"
            route="/login"
            title="Log in"
          />
          <CustomLink
            containerStyles="text-white text-sm md:text-base lg:text-lg xl:text-xl px-2 sm:px-3 xl:px-4 py-2 sm:mr-2 font-semibold rounded-full hover:bg-white hover:text-black font-Roboto"
            route="/register"
            title="Register"
          />
        </div>
      )}
      {isLogged && (
        <div className="flex gap-4">
          <CustomLink
            containerStyles="text-white px-4 py-2 font-semibold rounded-full hover:bg-white hover:text-black text-lg font-Roboto"
            route="/projects"
            title="Projects"
          />
          {/* <button onClick={logout} > */}
          <CustomLink
            click={logout}
            containerStyles="text-white px-4 py-2 font-semibold rounded-full hover:bg-white hover:text-black text-lg font-Roboto"
            route="/"
            title="Log out"
          />
          {/* </button> */}
        </div>
      )}
    </div>
  );
};

export default Header;