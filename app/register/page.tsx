'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { registerSchema, registerSchemaType } from '../../types/inputValidate';

const RegisterPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { register, handleSubmit } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const submit = async (data: registerSchemaType) => {
    console.log(data);
    if (!checkPassword(data.password, data.confirmPassword)) {
      alert('password and confirm password must match');

      return;
    }

    await axios
      .post(`${API_URL}/auth/register`, {
        name: data.username,
        email: data.email,
        password: data.password,
      })
      .then(res => {
        console.log(res);
        if (res.data.status === 'success') {
          console.log(res);
          localStorage.setItem('token', res.data.token);
          window.location.href = '/projects';
          console.log(res.data.token);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  // check retye password

  const checkPassword = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      return false;
    }

    return true;
  };

  return (
    <div className="flex flex-col justify-center items-center h-[90%] w-full">
      <h1 className="text-5xl font-bold">Sign Up</h1>
      <div className="">
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={handleSubmit(submit)}
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
            type="new-password"
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
