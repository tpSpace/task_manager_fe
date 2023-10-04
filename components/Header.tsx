'use client';
import React from 'react';

import CustomLink from './CustomLink';

const Header = () => {
  return (
    <div className="flex w-screen m-4">
      <div className="flex justify-start w-6/12">
        <CustomLink
          containerStyles="justify-self-start border-2 border-solid rounded-lg p-2"
          route="/"
          title="Home"
        />
      </div>
      <div className="flex justify-end w-6/12">
        <CustomLink
          containerStyles="justify-self-end mr-10 border-2 border-solid rounded-lg p-2"
          route="/login"
          title="Login"
        />
        <CustomLink
          containerStyles="justify-self-end mr-10 border-2 border-solid rounded-lg p-2"
          route="/register"
          title="Register"
        />
      </div>
    </div>
  );
};

export default Header;
