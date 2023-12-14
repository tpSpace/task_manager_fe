'use client';
import React, { useEffect, useState } from 'react';

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
    <div className="flex flex-row justify-between items-center p-4 overflow-hidden h-[10%]">
      <div className="">
        <CustomLink
          containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/"
          title="Home"
        />
      </div>
      {!isLogged && (
        <div className="flex gap-4">
          <CustomLink
            containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
            route="/login"
            title="Login"
          />
          <CustomLink
            containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
            route="/register"
            title="Register"
          />
        </div>
      )}
      {isLogged && (
        <div className="flex gap-4">
          <CustomLink
            containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
            route="/projects"
            title="Projects"
          />
          {/* <button onClick={logout} > */}
          <CustomLink
            click={logout}
            containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
            route="/"
            title="Logout"
          />
          {/* </button> */}
        </div>
      )}
    </div>
  );
};

export default Header;
