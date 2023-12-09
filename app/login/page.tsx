'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z, ZodType } from 'zod';

type LoginPageProps = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const schema: ZodType<LoginPageProps> = z.object({
    email: z.string().email().min(5).max(30),
    password: z.string().min(8).max(30),
  });
  const { register, handleSubmit } = useForm<LoginPageProps>({
    resolver: zodResolver(schema),
  });

  const submit = async (data: LoginPageProps) => {
    // TODO: login
    // help me write a axious request to login to the server
    await axios
      .post('http://localhost:3001/auth/login', {
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

  return (
    <div className="flex justify-center items-center h-[90%]">
      <div className="border-2 boder-solid border-black">
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={handleSubmit(submit)}
        >
          <input
            autoComplete="email"
            className="border-2 border-black p-1"
            placeholder="username"
            type="text"
            {...register('email')}
          />
          <input
            autoComplete="password"
            className="border-2 border-black p-1"
            placeholder="password"
            type="password"
            {...register('password')}
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
