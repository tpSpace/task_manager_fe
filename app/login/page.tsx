'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { z, ZodType } from 'zod';

import CustomLink from '@/components/CustomLink';

type LoginPageProps = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      .post(`${API_URL}/auth/login`, {
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
    <div className="flex justify-center items-center h-[90%] flex-col">
      <h1 className="text-5xl font-semibold font-['Roboto']">
        Welcome to TasKing
      </h1>
      <div>
        <form
          className="flex flex-col m-4 gap-4 justify-center items-center relative"
          onSubmit={handleSubmit(submit)}
        >
          <input
            autoComplete="email"
            className=" px-4 border-2 border-black p-1 bg-slate-50 rounded-full shadow shadow-black"
            placeholder="Email"
            type="text"
            {...register('email')}
          />
          <input
            autoComplete="current-password"
            className=" px-4 border-2 border-black p-1 bg-slate-50 rounded-full shadow shadow-black"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          <button
            className="border-2 w-1/4 border-black bg-white rounded-full hover:bg-black hover:text-white font-semibold shadow shadow-black font-['Roboto']"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <CustomLink
        containerStyles="text-black font-semibold font-['Roboto'] text-xl hover:underline cursor-pointer"
        route={'/register'}
        title={"Don't have an account? Sign up now!"}
      ></CustomLink>
    </div>
  );
};

export default LoginPage;
