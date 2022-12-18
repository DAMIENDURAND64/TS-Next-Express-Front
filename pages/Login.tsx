import { useForm, SubmitHandler } from "react-hook-form";

type TLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TLogin>();

  const onSubmit: SubmitHandler<TLogin> = (value) => console.log(value);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center"
    >
      <label>Email: </label>
      <input
        className="rounded-md bg-slate-300 w-fit px-2"
        type="email"
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      {errors.email && <p>An valide Email is required to login</p>}{" "}
      <label>Password: </label>
      <input
        className="rounded-md bg-slate-300 w-fit px-2"
        {...register("password", { required: true })}
      />
      {errors.password && <p>The password is required to login</p>}
      <button
        className="rounded-md bg-green-700 text-white px-2 mt-2"
        type="submit"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
