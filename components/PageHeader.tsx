'use client';

import React from 'react';

import Image from 'next/image';

export const PageHeader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 h-16 flex justify-between items-center p-4 bg-white text-black">
      {/* Logo, Website Name, and About Us Button */}
      <div className="flex items-center">
        <a className="flex items-center" href="/">
          <Image
            alt="Logo"
            className="cursor-pointer h-10"
            height={40}
            src="/logo.png"
            width={40}
          />
          <span className="ml-2 text-xl font-medium">Tasking</span>
        </a>
        {/* About Us Button */}
        <button
          className="ml-5 font-medium px-4 py-2 text-3x1 rounded-full hover:bg-gray-100"
          onClick={() => {
            // Handle the click on the About Us button
            window.location.href = '/about';
          }}
        >
          About Us
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center space-x-4">
        {/* Sign Up Button */}
        <button
          className="text-black px-4 py-2 font-medium rounded-full hover:bg-gray-100"
          onClick={() => {
            // Handle the click on the Sign Up button
            window.location.href = '/signup';
          }}
        >
          Sign Up
        </button>

        {/* Log In Button */}
        <button
          className="bg-black text-white px-4 py-2 font-bold rounded-full hover:bg-zinc-700"
          onClick={() => {
            // Handle the click on the Log In button
            window.location.href = '/login';
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};
