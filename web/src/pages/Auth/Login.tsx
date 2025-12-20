import { useLogin } from "@/hooks/useAuth";
import type { LoginType } from "@/types";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const formFields = [
  {
    type: "email",
    name: "email",
    placeholder: "john.doe@me.com",
  },
  {
    type: "password",
    name: "password",
    placeholder: "************",
  },
];

export function Login() {
  const { mutate, isPending } = useLogin();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as LoginType);
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl">Welcome Back</h2>
        <p>Join our cloud platform and start storing your files securely.</p>
      </div>

      <div className="card bg-base-200 shadow">
        <form className="flex flex-col gap-2 card-body" onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label htmlFor={field.name}>
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                className="input w-full rounded-2xl"
              />
            </div>
          ))}
          <button
            className="btn btn-primary mt-2 rounded-2xl"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <div className="text-center">
        <p>
          Don't have an Account?
          <Link to={"/signup"} className="ml-2 underline text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
