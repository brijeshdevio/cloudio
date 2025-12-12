import { useSignup } from "@/hooks/useAuth";
import type { SignupType } from "@/types";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

const formFields = [
  {
    type: "text",
    name: "name",
    placeholder: "John Doe",
  },
  {
    type: "email",
    name: "email",
    placeholder: "2VH0R@example.com",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Password",
  },
];

export function Signup() {
  const { mutate, isPending } = useSignup();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data as unknown as SignupType);
  };

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl">Create an Account</h2>
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
              "Create Account"
            )}
          </button>
        </form>
      </div>

      <div className="text-center">
        <p>
          Already have an Account?
          <Link to={"/login"} className="ml-2 underline text-primary">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}
