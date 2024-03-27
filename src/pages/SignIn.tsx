import {
  loginWithEmailWithPassword,
  signInWithGithub,
  signInWithGoogle,
} from 'api/auth';
import React, { useState } from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { MdArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignIn = () => {
  const [form, setForm] = useState<{ id: string; password: string }>({
    id: '',
    password: '',
  });
  const handleLoginGoogle = async () => {
    const user = await signInWithGoogle();
  };
  const handleLoginGithub = async () => {
    const user = await signInWithGithub();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = form.id;
    const password = form.password;
    loginWithEmailWithPassword(email, password);
  };
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col gap-4 mb-11'>
        <button
          className='w-96 h-10 flex justify-center items-center gap-2 bg-google text-white rounded'
          onClick={handleLoginGoogle}
        >
          <FaGoogle />
          구글로 로그인
        </button>
        <button
          className='w-96 h-10 flex justify-center items-center gap-2 bg-github text-white rounded'
          onClick={handleLoginGithub}
        >
          <FaGithub />
          깃허브로 로그인
        </button>
      </div>
      <div className='flex items-center gap-4'>
        <div className='w-40 h-px bg-neutral-300'></div>
        또는
        <div className='w-40 h-px bg-neutral-300'></div>
      </div>
      <form
        className='flex flex-col items-start gap-4 mt-4'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col gap-2'>
          <label htmlFor='id'>아이디</label>
          <input
            className='w-96 h-10 p-2 border border-neutral-400 rounded'
            type='text'
            id='id'
            placeholder='예)email@gmail.com'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>비밀번호</label>
          <input
            className='w-96 h-10 p-2 border border-neutral-400 rounded'
            type='password'
            id='password'
            placeholder='비밀번호를 입력해주세요.'
            onChange={handleChange}
          />
        </div>
        <button className='w-96 h-10 bg-lignt-brown rounded'>
          업체 회원 로그인
        </button>
      </form>
      <div className='flex justify-center gap-2 w-96 mt-4'>
        <p>아직 업체회원이 아니신가요?</p>
        <Link to='/signup'>
          <p className='flex items-center gap-1'>
            가입하기 <MdArrowForwardIos />
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
