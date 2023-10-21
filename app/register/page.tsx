'use client';

import React from 'react';

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-[90%] w-full">
      <div>
        <form>
          <input type="text">Username</input>
          <input type="text">Email</input>
          <input type="password">Password</input>
          <input type="password">Confirm Password</input>
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
