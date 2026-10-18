"use client";
import axios from 'axios';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { EmailIcon, LockIcon, UserIcon } from '../../../../public/icons'
import { LoaderIcon } from '../../../../public/icons/LoaderIcon';

 

function Page() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(false);
  const [authUser, setAuthUser] = useState({ name: "", email: "", password: ""})

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisLoading(true);
      
    try {
      const response = await api.post("/register", {
        name: authUser.name,
        email: authUser.email,
        password: authUser.password,
      });

      console.log(response.data);

      router.push("/login");
    } catch (error) {
        if(axios.isAxiosError(error)) {
          console.error(
            error.response?.data?.message ?? "Registration failed",
          )
        } else {
          console.log("unexpected error occurs:", error);
        }
    } finally {
      setisLoading(false);
    }
  }

  return (
    <div className='bg-background min-h-screen flex justify-center items-center font-inter'>
      <div className='w-108.75 h-121.5 rounded-2xl p-6 bg-[#181818] flex flex-col items-center justify-start border-t-2 border-[#2F2F2F] shadow-md'>
        <div className='w-full flex flex-col justify-center items-center gap-6'>
          <div className='items-center shadow-md'>
            <img 
              src={"/logoIcon.png"} 
              className='w-13.75 h-13.75 rounded-lg'
            />
          </div>
          <div className='w-full flex flex-col justify-center items-center gap-4.5'>
            <div className='flex flex-col justify-center items-center gap-3.5'>
              <h2 className='text-[24px] font-medium'>Welcome Back</h2>
              <p className='text-[12px] text-[#868686] tracking-wide'>Already have an account? <a href='/login' className='text-white text-[12px] font-semibold hover:text-[#0174DC] transition-all duration-300'>Login</a></p>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-4'>
              {/* Name */}
              <div className='w-full h-11 bg-[#111111] border-2 border-[#232323] rounded-lg p-2.5 flex justify-start items-center gap-2.25'>
                <div>
                  <UserIcon className='text-[#868686] w-4 h-4'/>
                </div>
                <input 
                  type='text'
                  value={authUser.name}
                  onChange={(e) => setAuthUser((prev) => ({...prev, name: e.target.value}))}
                  placeholder='Name'
                  autoComplete='off'
                  className='w-full bg-none outline-none text-[12px] text-[#868686] font-medium leading-0'
                />
              </div>

              {/* Email */}
              <div className='w-full h-11 bg-[#111111] border-2 border-[#232323] rounded-lg p-2.5 flex justify-start items-center gap-2.25'>
                <div>
                  <EmailIcon className='text-[#868686] w-4 h-4'/>
                </div>
                <input
                  type='text' 
                  value={authUser.email}
                  onChange={(e) => setAuthUser((prev) => ({...prev, email: e.target.value}))}
                  placeholder='Email address'
                  autoComplete='off'
                  className='w-full bg-none outline-none text-[12px] text-[#868686] font-medium leading-0'
                />
              </div>

              {/* Password */}
              <div className='w-full h-11 bg-[#111111] border-2 border-[#232323] rounded-lg p-2.5 flex justify-start items-center gap-2.25'>
                <div>
                  <LockIcon className='text-[#868686] w-4 h-4'/>
                </div>
                <input 
                  type='password'
                  value={authUser.password}
                  onChange={(e) => setAuthUser((prev) => ({...prev, password: e.target.value}))}
                  placeholder='Password'
                  autoComplete='new-password'
                  className='w-full outline-none bg-none text-[12px] text-[#868686] font-medium leading-0'
                />
              </div>

              {/* button */}
              <button
                type='submit'
                disabled={isLoading}
                onClick={handleSubmit}
                className='w-full h-9.5 bg-[#0174DC] cursor-pointer rounded-lg text-[12px] p-2.5 flex items-center justify-center hover:bg-[#0174DC]/80 transition-all duration-300 shadow-md'
              >
                {
                  isLoading ? (
                    <LoaderIcon className='rotate-180'/>
                  ) : (
                    "Create Account"
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
