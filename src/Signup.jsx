import FacebookIcon from './assets/SocialLogos/Facebook.png';
import YahooIcon from './assets/SocialLogos/Yahoo.png';
import GoogleIcon from './assets/SocialLogos/Google.png';

function Singnup() {
    return(
        <div className='min-w-full min-h-screen bg-cover  bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-end '>
            <div className='h-screen w-[40%]  flex-col items-center justify-center'>
                <h1 className='font-agdasima font-black text-[70px] italic text-[#FFCC66] text-light-shadow text-center'>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-[40px] text-light-shadow text-center'>SIGN IN</h1>
                <div className=' mx-auto h-[70%] w-[80%] flex flex-col gap-[10px] mt-[2%]'>
                    <div className='flex flex-row  justify-between'>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>First name</h1>
                            <input type="text" name="" id="" className='w-full h-[30px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg'/>
                        </div>
                        <div className='w-[45%]'>
                            <h1 className='font-agdasima text-2xl text-white font-medium'>Last name</h1>
                            <input className='w-full h-[30px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' type="text" name="" id="" />
                        </div>

                    </div>
                    <div className='flex-col justify-end '>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input type="text" className='w-full h-[30px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <input type="text" className='w-full h-[30px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <input type="text" className='w-full h-[30px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <button className='font-outfit mt-[5%] bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]'>Sign In</button>
                    <div className='flex-1 w-[full] border-t border-white border-t-[4px] pt-[4%]'>
                        <h1 className='text-white font-agdasima text-3xl font-bold text-center'>OR</h1>
                        <div className='w-[100%] min-w-[470px] flex flex-row justify-between mt-[4%]'>
                            <button className='bg-[#FFCC66] w-[150px]  flex flex-row items-center justify-center gap-2 font-outfit font-medium text-black text-[20px] hover:bg-white transition-colors duration-300 shadow-lg'> <img className='h-[40px] w-[40px] aspect-square' src={GoogleIcon} alt="" />Google</button>
                            <button className='bg-[#FFCC66] w-[150px]  flex flex-row items-center justify-center font-outfit font-medium text-black text-[20px] hover:bg-white transition-colors duration-300 shadow-lg'> <img className='h-[40px] w-[50px] aspect-square' src={FacebookIcon} alt="" />Facebook</button>
                            <button className='bg-[#FFCC66] w-[150px]  flex flex-row items-center justify-center font-outfit font-medium text-black text-[20px] hover:bg-white transition-colors duration-300 shadow-lg'> <img className='h-[50px] w-[70px] aspect-square' src={YahooIcon} alt="" />Yahoo</button>
                        </div>
                        <h1 className='font-outfit text-white text-center mt-[10%] text-xl'>Already have an account? <a href="" className='text-[#FFCC66] underline hover:text-white'>Log in</a></h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singnup;