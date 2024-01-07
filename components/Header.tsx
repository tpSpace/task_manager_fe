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
    <div className="flex flex-row justify-between items-center overflow-hidden h-[10%] p-10 px-20 bg-black text-black">
      <div className="flex flex-row items-center justify-center">
        <Image
          alt="Logo"
          className={`cursor-pointer`}
          height={65}
          onClick={() => {
            window.location.href = '/';
          }}
          src="/logo.svg"
          width={65}
        />
        <CustomLink
          containerStyles="font-semibold text-2xl ml-4 text-white font-Montserrat"
          route="/"
          title="TasKing"
        />
      </div>
      {!isLogged && (
        <div className="flex gap-4">
          <CustomLink
            containerStyles="text-white px-4 py-2 font-semibold rounded-full hover:bg-white hover:text-black text-lg font-Roboto"
            route="/login"
            title="Log in"
          />
          <CustomLink
            containerStyles="text-white px-4 py-2 font-semibold rounded-full hover:bg-white hover:text-black text-lg font-Roboto"
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
