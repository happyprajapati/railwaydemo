import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bounce, toast } from "react-toastify";
import { loginContext } from "./../context/context";

const schema = z.object({
  phone: z
    .string({ message: "contact number required" })
    .min(10, { message: "Invalid contact number" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [message, setMsg] = useState("");
  const navigate = useNavigate();
  const login = useContext(loginContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(()=> {
    console.log('hello world!!')
  }, [])

  const handleLogin = (formData) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === true) {
          if (res.role != "ROLE_ADMIN") {
            localStorage.setItem("authToken", res.jwt);
            localStorage.setItem("role", res.role);
            login.setLogin(true);
            toast.success(res.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            navigate("/");
          } else {
            toast.error("Accees Denied !!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg(`Error Occured : ${err}`);
      });
  };

  return (
    <div className="flex h-screen items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
            <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                Contact No
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phone")}
                  name="phone"
                  pattern="[0-9]{10}"
                  placeholder="Enter your number"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                  <BsTelephone className="text-gray-500 h-5 w-5" />
                </span>
                {errors.contact && (
                  <span className="text-[#b91c1c]">
                    {errors.contact.message}
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                  Password
                </label>
                <a
                  href="/forgetpass"
                  className="text-sm text-gray-500 underline transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <input
                  {...register("password")}
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                  {!showPass && (
                    <FaRegEye
                      className="text-gray-500 h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    />
                  )}
                  {showPass && (
                    <FaRegEyeSlash
                      className="text-gray-500 h-5 w-5 cursor-pointer"
                      onClick={() => {
                        setShowPass(!showPass);
                      }}
                    />
                  )}
                </span>
                {errors.password && (
                  <span className="text-[#b91c1c]">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center flex-col gap-3">
              <button
                type="submit"
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg disabled:bg-[#6b7280] disabled:cursor-not-allowed"
                disabled={isSubmitting}
                value="submit"
              >
                {isSubmitting ? "Checking..." : "Sign In"}
              </button>
              <p>
                Dont have an Account ? <a href="/register">sign up</a>
              </p>
            </div>
          </form>
        </div>
        {message && (
          <div className="flex justify-center w-full my-2 p-2 border border-[#dc2626] bg-[#fecaca] rounded-md">
            <span className="text-[#b91c1c]">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
