import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PiCity } from "react-icons/pi";
import { PiCodeSimpleBold } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bounce, toast } from 'react-toastify';
import { City } from 'country-state-city';

const schema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    city: z.string().min(3, { message: "City must be at least 3 characters" }),
    // otp: z.string({ message: "OTP required" }).min(6, { message: "OTP must be 6 characters" }),
    phone: z.string({message: "contact number required"}).min(10, { message: "Invalid contact number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

export default function Register() {

  const [showPass, setShowPass] = useState(false);
  const [message, setMsg] = useState("");
  const [city, setCity] = useState([]);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [isOtpVarified, setIsOtpVarified] = useState(false);
  const [isOtpWrong, setIsOtpWrong] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(()=>{
    setCity(City.getCitiesOfState('IN', 'GJ'));
  },[])

  useEffect(()=>{
    if(userOtp.length === 6 && userOtp === otp){
      console.log(userOtp)
      setIsOtpVarified(true)
      setIsOtpWrong(false)
    }
    else if(userOtp.length > 5 && userOtp != otp){
      setIsOtpVarified(false)
      setIsOtpWrong(true)
    }
  },[userOtp])

  const handleOtp = () => {
    if(contact.length === 10){
      fetch(`${import.meta.env.VITE_BASE_URL}/auth/getotp`, {
        method: "POST",
        body: JSON.stringify({"phone": contact}),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === true) {
            console.log(res.message)
            setOtp(res.data)
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
          }else{
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
        }).catch((err) => {
          console.log(err);
          setMsg(`Error Occured : ${err}`);
        });
    }
  }

const hanldeRegister = (formData) => {
  if(isOtpVarified === true){
    fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
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
          console.log(res.message)
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
            navigate("/login");
        }else{
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
      }).catch((err) => {
        console.log(err);
        setMsg(`Error Occured : ${err}`);
      });
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center px-4 md:px-6 pt-20 pb-10 md:pt-20 lg:pt-24 xl:pt-24">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Sign up</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(hanldeRegister)}>
          <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                Name
              </label>
              <div className="relative">
                <input
                  {...register("name")}
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                <FaRegUser className="text-gray-500 h-5 w-5" />
                </span>
              </div>
                {errors.name && 
                  <span className="text-[#b91c1c]">
                    {errors.name.message}
                  </span>
                }
            </div>
            <div>
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                City
              </label>
              <div className="relative">
              <select
                  {...register("city")}
                  name="city"
                  type="text"
                  placeholder="Enter your city"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                >
                <option className="py-2">Select City</option>
                    {city.map((city, key) => (
                      <option value={city.name} key={key} className="py-2">
                        {city.name}
                      </option>
                    ))}
                  </select>
                <span className="absolute right-4 top-3">
                <PiCity className="text-gray-500 h-6 w-6" />
                </span>
              </div>
              {errors.city && 
                  <span className="text-[#b91c1c]">
                    {errors.city.message}
                  </span>
                }
            </div>
            <div className="flex space-x-4 flex-row">
              <div className="flex-1">
              <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                Contact No
              </label>
              <div className="relative">
                <input
                {...register("phone")}
                  onChange={(e)=>{setContact(e.target.value)}}
                  name="phone"
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Enter your number"
                  className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="absolute right-4 top-3.5">
                <BsTelephone className="text-gray-500 h-5 w-5" />
                </span>
              </div>
              {errors.contact && 
                  <span className="text-[#b91c1c]">
                    {errors.contact.message}
                  </span>
                }
            </div>
            <div className="flex place-items-end mb-2 justify-center">
                <button
                  // type="submit"
                  className="h-10 bg-bt text-bt-tx px-3 rounded-lg"
                  onClick={handleOtp}
                >
                  Send OTP
                </button>
              </div>
              </div>
              <div className="flex-1">
                <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                  OTP
                </label>
                <div className="relative">
                  <input
                    onChange={(e)=>{setUserOtp(e.target.value)}}
                    // {...register("otp")}
                    name="otp"
                    type="number"
                    placeholder="Enter your OTP"
                    className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />

                  <span className="absolute right-4 top-3.5">
                  <PiCodeSimpleBold  className="text-gray-500 h-5 w-5" />
                  </span>
                </div>
                {isOtpVarified &&
                  <span className="text-[#15803d]">
                    OTP varified
                  </span>
                }
                {isOtpWrong && 
                  <span className="text-[#b91c1c]">
                    Wrong OTP
                  </span>
                }
            </div>
            <div className="mb-6">
                  <label className="mb-1 ml-1 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      name="password"
                      type={showPass ? "text" : "password"}
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent p-3 text-black outline-none focus:border-primary focus:shadow-md dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <span className="absolute right-4 top-3.5">
                    {!showPass && (
                  <FaRegEye className="text-gray-500 h-5 w-5 cursor-pointer" 
                    onClick={() => {
                      setShowPass(!showPass);
                    }}/>
                )}
                {showPass && (
                  <FaRegEyeSlash className="text-gray-500 h-5 w-5 cursor-pointer"  
                  onClick={() => {
                    setShowPass(!showPass);
                  }}/>
                )}
                </span>
                  </div>
                  {errors.password && 
                  <span className="text-[#b91c1c]">
                    {errors.password.message}
                  </span>
                }
                </div>
            <div className="flex items-center flex-col gap-3">
              <button
                type="submit"
                disabled={!isOtpVarified && !isSubmitting}
                className="bg-bt text-bt-tx px-10 py-2 rounded-lg disabled:bg-[#6b7280] disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Sign Up"} 
              </button>
              <p>
                Already have an Account ? <a href="login">sign in</a>
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
