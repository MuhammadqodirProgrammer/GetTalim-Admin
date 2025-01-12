'use client';
import { useRef, useState } from 'react';
import instance from '../api/api';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

import logo from '../../../public/images/logo2.png';
import hand from '../../../public/images/hand.png';
import eye from '../../../public/images/eye-invisible.png';
import info from '../../../public/images/information.png';
import dots from '../../../public/images/Caurusel.png';
import Image from '../../../node_modules/next/image';
export default function Page() {
	// const router = useRouter();
	const router = useRouter();
	const [error, seterror] = useState<boolean>(false);

	const loginNotify = () => toast.success('Successfully Logined');
	const emailRef:any = useRef<HTMLInputElement>();
	const pasRef:any = useRef<HTMLInputElement>();
	const HendleSubmit = async (e: any) => {
		e.preventDefault();
		const email = emailRef.current?.value;
		const pas = pasRef.current?.value;
		const data = {
			email,
			password: pas,
		};

		let response = await instance.post('/api/StudentAuth/login', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response?.status === 200) {
			if (typeof window !== 'undefined') {
			  let token = response?.data?.token;
			  localStorage.setItem('token', token);
		  
			  loginNotify();
			  router.replace('/');
			}
		  } else {
			seterror(true);
		  }
		  
	};

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	return (
		<section className=' flex w-[100%] md:flex-nowrap flex-wrap h-[100vh] bg-[teal] '>
			<div className='left py-[30px] md:w-[50%] w-[100%] bg-[#E2F0FF]  flex items-center justify-center  '>
				<div className='left_box text-center '>
					<Image
						src={logo}
						alt='img'
						className=' w-[300px] h-[280px] objetct-cover   '
					/>

					<h3 className=' text-[#292731] text-[26px]  my-[20px] '> Login </h3>

					<p className='  text-[#292731] text-[26px]  my-[20px]  '>
						Get talim adminlari uchun
					</p>

					<Image src={dots} alt='img' className=' mx-auto ' />
				</div>
			</div>

			<div className='right py-[30px] md:w-[50%] w-[100%] bg-[#FFFFFF]   flex items-center justify-center  '>
				<div className=' md:w-[60%]  w-[80%] mx-auto '>
					<Image src={hand} alt='img' className='objetct-cover mb-2  ' />

					<h4 className=' text-[#292731] text-[30px]  font-bold my-[20px]  '>
						Welcome back!
					</h4>
					<p className=' text-[#292731] text-[16px]  font-normal my-[20px]  '>
						Please login to access your account.
					</p>

					<form className='' onSubmit={HendleSubmit}>
						<div className='mb-4 md:w-full'>
							<div className='flex mb-[12px] justify-between items-center '>
								<label
									htmlFor='email'
									className='block text-xs  text-[#455360]  '
								>
									G-mail
								</label>

								<Image src={info} alt='img' className='objetct-cover  ' />
							</div>
							<input
								className='w-full
        px-4
        py-2
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1'
								type='email'
								name='email'
								id='email'
								placeholder='Username or Email'
								ref={emailRef}
							/>
						</div>
						<div className='mb-6 md:w-full'>
							<label
								htmlFor='email'
								className='block text-xs  text-[#455360] mb-[12px]  '
							>
								Password
							</label>

							<div className='relative w-[100%] '>
								<input
									type={isPasswordVisible ? 'text' : 'password'}
									placeholder='Password'
									className='w-full
        px-4
        py-2
        text-base
        border border-gray-300
        rounded
        outline-none
        focus:ring-blue-500 focus:border-blue-500 focus:ring-1'
									ref={pasRef}
								/>
								<button
									type='button'
									className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-600'
									onClick={togglePasswordVisibility}
								>
									{isPasswordVisible ? (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
											/>
										</svg>
									) : (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-5 h-5'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
											/>
										</svg>
									)}
								</button>
							</div>
						</div>

						<a
							href='#'
							className=' block  text-[#66BCE8] text-[16px] font-medium  my-[18px] '
						>
							{' '}
							Forgot Pasword?{' '}
						</a>

						<button
							className='bg-[#4C70FF] hover:bg-[#254dee] text-white uppercase text-sm font-semibold px-4 py-2 rounded-[8px]   w-[100%]  '
							type='submit'
						>
							Log In
						</button>

						<p className=' text-[#292731] text-[16px] text-center  font-normal my-[20px]  '>
							Don&apos;t have an account?
							<a
								href='#'
								className='   text-[#66BCE8] text-[16px] font-medium  my-[18px] '
							>
								{' '}
								Sign Up{' '}
							</a>
						</p>
					</form>
				</div>
			</div>

			<Toaster />
		</section>
	);
}
