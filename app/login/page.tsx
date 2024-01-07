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
      <h1 className="text-6xl font-bold font-Montserrat">Welcome to TasKing</h1>
      <div>
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={handleSubmit(submit)}
        >
          <input
            autoComplete="email"
            className=" px-4 border-[1px] border-black p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
            placeholder="Email"
            type="text"
            {...register('email')}
          />
          <input
            autoComplete="current-password"
            className=" px-4 border-[1px] border-black p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          <button
            className="border-[1px] p-1 border-black bg-white rounded-xl hover:bg-black hover:text-white font-semibold text-xl font-Roboto"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <CustomLink
        containerStyles=" text-slate-400 font-Roboto text-lg hover:underline cursor-pointer"
        route={'/register'}
        title={"Don't have an account? Register now!"}
      ></CustomLink>
    </div>
  );
};

export default LoginPage;
