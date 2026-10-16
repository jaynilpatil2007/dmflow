"use client";
import { EmailIcon, LockIcon, UserIcon } from '../../../../public/icons'

function page() {
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
                  placeholder='Password'
                  autoComplete='new-password'
                  className='w-full outline-none bg-none text-[12px] text-[#868686] font-medium leading-0'
                />
              </div>

              {/* button */}
              <button
                className='w-full h-9.5 bg-[#0174DC] cursor-pointer rounded-lg text-[12px] p-2.5 flex items-center justify-center hover:bg-[#0174DC]/80 transition-all duration-300 shadow-md'
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
