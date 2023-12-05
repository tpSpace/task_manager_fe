'use client';
import React from 'react';

import CustomLink from './CustomLink';

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-center p-4 overflow-hidden h-[10%]">
      <div className="">
        <CustomLink
          containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/"
          title="Home"
        />
      </div>
      <div className="flex gap-4">
        <CustomLink
          containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/projects"
          title="Login"
        />
        <CustomLink
          containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/register"
          title="Register"
        />
      </div>
    </div>
  );
};

export default Header;
