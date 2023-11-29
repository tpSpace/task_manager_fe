'use client';

import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="border-2 boder-solid border-black">
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={() => {
            console.log('fvk');
          }}
        >
          <input
            className="border-2 border-black p-1"
            placeholder="username"
            type="text"
          />
          <input
            className="border-2 border-black p-1"
            placeholder="password"
            type="password"
          />
          <button
            className="border-2 border-black bg-white hover:bg-black hover:text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
