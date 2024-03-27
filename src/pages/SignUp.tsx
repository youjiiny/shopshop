import { signUpWithEmailAndPassword } from 'api/auth';
import { useForm } from 'react-hook-form';
import type { CompanyUserSignUpType } from 'types/auth';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/checkEffectiveness';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<CompanyUserSignUpType>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });
  const password = watch('password');
  const onSubmit = handleSubmit((data) => {
    const email = data.email;
    const password = data.password;
    signUpWithEmailAndPassword(email, password);
  });

  return (
    <form
      className='flex flex-col justify-center items-center gap-6 h-screen'
      onSubmit={onSubmit}
    >
      <div className='flex flex-col gap-2 w-96'>
        <label htmlFor='email'>이메일</label>
        <input
          className='h-12 p-2 border border-neutral-400 rounded'
          type='text'
          id='email'
          {...register('email', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: EMAIL_REGEX,
              message: 'example@test.com 형식으로 입력해주세요',
            },
          })}
          placeholder='이메일 입력'
        />
        {errors.email && (
          <div className='text-red-500'>
            <p>{errors.email.message}</p>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 w-96'>
        <label htmlFor='password'>비밀번호</label>
        <input
          className='h-12 p-2 border border-neutral-400 rounded'
          type='password'
          id='password'
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: PASSWORD_REGEX,
              message: '영문,숫자 포함 6자 이상 입력해주세요.',
            },
          })}
          placeholder='비밀번호 입력'
        />
        {errors.password && (
          <div className='text-red-500'>
            <p>{errors.password.message}</p>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 w-96'>
        <label htmlFor='confirm-password'>비밀번호 확인</label>
        <input
          className='h-12 p-2 border border-neutral-400 rounded'
          type='password'
          id='confirm-password'
          {...register('confirmPassword', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (confirmPassword) => {
              if (password !== confirmPassword) {
                return '비밀번호가 일치하지 않습니다.';
              }
            },
          })}
          placeholder='비밀번호 확인'
        />
        {errors.confirmPassword && (
          <div className='text-red-500'>
            <p>{errors.confirmPassword.message}</p>
          </div>
        )}
      </div>
      <button
        className='w-96 h-12 bg-primary rounded disabled:bg-neutral-300 text-white'
        disabled={!isValid}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
