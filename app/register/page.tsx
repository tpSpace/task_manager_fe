'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { registerSchema, registerSchemaType } from '../../types/inputValidate';

const RegisterPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const watchUsername = watch('username');
  const watchEmail = watch('email');

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
      <h1 className="text-6xl font-bold font-Montserrat mb-16">
        Welcome to TasKing
      </h1>
      <div className="">
        <form
          className="flex flex-col m-4 gap-4"
          onSubmit={handleSubmit(submit)}
        >
          {/* // make an alert for error */}
          <span
            className={
              '-mb-4 font-semibold text-base font-Roboto text-neutral-600'
            }
          >
            Username
          </span>
          <>
            {watchEmail && errors.username && <p>{errors.username.message}</p>}
            <input
              {...register('username')}
              className="px-4 border-[1px] border-gray-300 p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
              onChange={() => console.log(watchEmail)}
              placeholder="Enter username"
              type="text"
            />
          </>
          <span
            className={
              '-mb-4 -mt-4 font-semibold text-base font-Roboto text-neutral-600'
            }
          >
            Email
          </span>
          <input
            {...register('email')}
            className="px-4 border-[1px] border-gray-300 p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
            placeholder="Enter email"
            type="email"
          />
          <span
            className={
              '-mb-4 -mt-4 font-semibold text-base font-Roboto text-neutral-600'
            }
          >
            Password
          </span>
          <input
            {...register('password')}
            className="px-4 border-[1px] border-gray-300 p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
            placeholder="Enter password"
            type="password"
          />
          <span
            className={
              '-mb-4 -mt-4 font-semibold text-base font-Roboto text-neutral-600'
            }
          >
            Retype Password
          </span>
          <input
            {...register('confirmPassword')}
            className="px-4 border-[1px] border-gray-300 p-1 bg-gray-100 rounded-xl focus:border-[3px] font-Roboto"
            placeholder="Enter retype-password"
            type="new-password"
          />
          <button
            className="border-[1px] p-1 border-cyan-300 bg-cyan-50 rounded-xl hover:bg-cyan-100 text-cyan-500 font-semibold text-xl font-Roboto"
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
