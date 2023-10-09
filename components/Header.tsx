'use client';
import React from 'react';

import CustomLink from './CustomLink';

const Header = () => {
  return (
    <div className="flex m-4 flex-row justify-between border-black border-1 h-2.5">
      <div className="">
        <CustomLink
          containerStyles="border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/"
          title="Home"
        />
      </div>
      <div className="">
        <CustomLink
          containerStyles="mr-10 border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/login"
          title="Login"
        />
        <CustomLink
          containerStyles="mr-10 border-2 border-solid border-black rounded-lg p-2 hover:bg-black hover:text-white"
          route="/register"
          title="Register"
        />
      </div>
    </div>
  );
};

export default Header;
