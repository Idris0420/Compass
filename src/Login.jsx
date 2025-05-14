import FacebookIcon from './assets/SocialLogos/Facebook.png';
import YahooIcon from './assets/SocialLogos/Yahoo.png';
import GoogleIcon from './assets/SocialLogos/Google.png';

function Login(){
    
    return(
        <div className='min-w-full min-h-screen bg-cover  bg-[url("./assets/LoginBg.png")] bg-no-repeat flex justify-center md:justify-end '>
            <div className='h-screen w-[45%] pt-[2%] flex-col items-center justify-center'>
                <h1 className='font-agdasima font-black text-[70px] italic text-[#FFCC66] text-light-shadow text-center'>COMPASS</h1>
                <h1 className='font-agdasima font-medium text-white text-[40px] pt-[1%] text-light-shadow text-center'>Login</h1>
                <div className=' mx-auto h-[70%] w-[80%] flex flex-col gap-[10px] mt-[2%]'>
                    <div className='flex-col  justify-end '>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Email</h1>
                        <input type="text" className='w-full h-[40px] bg-white border border-gray-500 border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <div>
                        <h1 className='font-agdasima text-2xl text-white font-medium'>Password</h1>
                        <input type="text" className='w-full h-[40px] bg-white border border-[#7E7E7E] border-1 px-2 focus:border-[#FFCC66] focus:ring-1 focus:ring-[#FFCC66] outline-none shadow-lg' />
                    </div>
                    <button className='font-outfit mt-[5%] bg-[#FFCC66] px-[50px] py-[10px] mx-auto font-bold shadow-lg hover:bg-white transition-colors duration-300 mb-[2%]'>Login</button>
                    <h1 className='font-outfit text-white text-center mt-[10%] text-medium md:text-xl'>Don't have an account? <a href="" className='text-[#FFCC66] underline hover:text-white'>Sign up</a></h1>
                </div>
            </div>
        </div>
    )

}

export default Login