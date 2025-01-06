import { useForm } from 'react-hook-form';
import Input2 from '../../ui/Input2';
import { Link, useNavigate } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Image from '../../assets/Side Image.png';

function SignUp() {
  interface IFormInput {
    name: string;
    email: string;
    password: string;
  }
  const { isLoading, signup } = useSignup();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  async function onSubmit(newRow: IFormInput) {
    signup(newRow);
    navigate('/');
  }
  return (
    <div className="   flex justify-center items-center  flex-col   p-20 gap-24 ">
      <p
        onClick={() => navigate(-1)}
        className=" z-50  text-[20px] absolute top-[60px]  left-2"
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </p>
      <div className="  flex  flex-row-reverse gap-3 h-[80vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="   min-w-[300px]  h-[350px]  flex flex-col  gap-7 p-4     "
        >
          <h1 className="  text-2xl    font-bold">Create an account</h1>
          <p>Enter your details below</p>

          <Input2
            label={'name'}
            register={register}
            type={'text'}
            name={'name'}
          />
          <Input2
            label={'email'}
            register={register}
            type={'text'}
            name={'email'}
          />
          <Input2
            label={'password'}
            register={register}
            type={'text'}
            name={'password'}
          />
          <button
            disabled={isLoading}
            className=" p-1 rounded-sm bg-red-600 text-white   "
            type="submit"
          >
            Create Account
          </button>
          <button
            disabled={isLoading}
            className=" p-1 rounded-sm  border-[1px]  "
          >
            Sign up with Google
          </button>
          <p>
            Already have account? <Link to="/LogIn">Log in</Link>
          </p>
        </form>
        <img src={Image} className=" hidden lg:block   " />
      </div>
    </div>
  );
}

export default SignUp;
