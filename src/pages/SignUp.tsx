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
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor='email'>이메일</label>
        <input
          type='text'
          id='email'
          {...register('email', {
            required: '이메일을 입력해주세요',
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
      <div>
        <label htmlFor='password'>비밀번호</label>
        <input
          type='password'
          id='password'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
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
      <div>
        <label htmlFor='confirm-password'>비밀번호 확인</label>
        <input
          type='password'
          id='confirm-password'
          {...register('confirmPassword', {
            required: '비밀번호를 입력해주세요',
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
      <button disabled={!isValid}>회원가입</button>
    </form>
  );
};

export default SignUp;
