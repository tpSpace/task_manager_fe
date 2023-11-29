'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { registerSchema, registerSchemaType } from '../../types/inputValidate';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="flex justify-center items-center h-[90%] w-full">
      <div className="border-2 boder-solid border-black">
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={handleSubmit(data => {
            console.log(data);
          })}
        >
          <input
            {...register('username')}
            className="border-2 border-black p-1"
            placeholder="username"
            type="text"
          />
          <input
            {...register('email')}
            className="border-2 border-black p-1"
            placeholder="email"
            type="email"
          />
          <input
            {...register('password')}
            className="border-2 border-black p-1"
            placeholder="password"
            type="password"
          />
          <input
            {...register('confirmPassword')}
            className="border-2 border-black p-1"
            placeholder="retype-password"
            type="password"
          />
          <button
            className="border-2 border-black bg-white hover:bg-black hover:text-white"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
