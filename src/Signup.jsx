
function Singnup() {
    return(
        <div className='min-w-full min-h-screen bg-cover  bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-center md:justify-end'>
            <div className='min-h-screen  md:w-[60%] max-w-[800px] flex flex-col items-center justify-start md:pt-[2%]'>
                <h1 className='font-agdasima font-black text-5xl md:text-[70px] italic text-[#FFCC66] text-light-shadow text-center '>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-4xl md:text-[40px] text-light-shadow text-center'>SIGN IN</h1>
                <div className='mx-auto w-[80%] flex flex-col gap-[10px] mt-[2%] '>
                    <div className='flex flex-row  justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>First name</h1>
                            <input type="text" name="" id="" className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'/>
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Last name</h1>
                            <input className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' type="text" name="" id="" />
                        </div>

                    </div>
                    <div className='flex-col justify-end '>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input type="text" className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <input type="text" className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Confirm Password</h1>
                        <input type="text" className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                        <h1 className="font-outfit text-2xl text-white text-sm">Password must contain:</h1>
                        <ul className='list-disc list-none text'>
                            <li className="font-outfit text-2xl text-white text-sm">At least 8 characters</li>
                            <li className="font-outfit text-2xl text-white text-sm">At least one uppercase letter</li>
                            <li className="font-outfit text-2xl text-white text-sm">At least one lowercase letter</li>
                            <li className="font-outfit text-2xl text-white text-sm">At least one number</li>
                            <li className="font-outfit text-2xl text-white text-sm">At least one special character</li>
                        </ul>
                    </div>
                    <h1 className="font-outfit text-2xl text-white text-lg text-center">By signing up you agree to our Terms of Service and Privacy Policy.</h1>
                    <button className='font-outfit bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300'>Sign In</button>
                
                    <h1 className='font-outfit text-white text-center text-medium md:text-xl'>Already have an account? <a href="" className='text-[#FFCC66] underline hover:text-white'>Log in</a></h1>
                </div>
            </div>
        </div>
    )
}

export default Singnup;