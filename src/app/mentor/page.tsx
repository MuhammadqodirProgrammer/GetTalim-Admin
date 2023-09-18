import Link from 'next/link';
import { FaUserTie } from "react-icons/fa";
import { AiFillStar } from 'react-icons/ai';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCalendarMonth } from 'react-icons/md';

export default function Resources() {
	return (

		<>
		 <nav className="flex justify-between mb-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/dashboard">
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                home
              </Link>
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
               Mentors            
			</a>
            </div>
          </li>
        </ol>
      </nav>
		<div className='grid grid-cols-1 gap-2 lg:grid-cols-2'>
			<div className='p-4 border border-gray-200 shadow bg-[#171923] rounded-lg dark:border-gray-700 dark:bg-gray-800'>
				<div className='flex flex-col items-center md:flex-row md:max-w-xl'>
					<img
						className='image-square p-2 rounded-full h-40'
						src='http://64.227.42.134:3030/media\avatars\IMG_75814627-7be5-4d72-b5b9-732cec83b1ab.jpg'
						alt="img"
					/>
					<div className='flex flex-col justify-between ml-3 leading-normal'>
						<h5 className='ml-1 text-2xl font-bold tracking-tight text-white dark:text-white'>
							MuhammadNozim Anvarbekov
						</h5>
						<span className='ml-1 font-normal bold text-gray-700 dark:text-gray-400'>
							nozimjon@mail.ru
						</span>
						<div className='flex items-center font-normal text-gray-700 dark:text-gray-400'>
							<span className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/Star.svg*/}
								
								<AiFillStar size={20} />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'>4.8 Rate </span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/User.svg*/}
								<FaUserTie size="20" />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +1000 students</span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Media/DVD.svg*/}
								<AiFillPlayCircle size="20"/>
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +13 Courses</span>
						</div>
						<div className='flex ml-1 items-center mt-2'>
							<span className='text-white'>

						<MdCalendarMonth size="20" />
							</span>
							<p className='me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								30.08.2023 12:43 PM
							</p>
							<svg
								className='w-4 h-4 text-white dark:text-white'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z' />
								<path d='M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z' />
							</svg>
							<p className='mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								02.09.2023 1:22 AM
							</p>
						</div>
					</div>
				</div>
				<div className='p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151] mt-2 '>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						MuhammadNozim Anvarbekov -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						something gone wrong
					</span>
				</div>
				<div className='mt-3 p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151]'>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						Stack -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						gir gir gir no stack
					</span>
				</div>
				<div className='flex mt-1'>
					{/* Modal toggle */}
					<button className='mt-2 w-full justify-center text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-blue-500'>
						Yangilash
					</button>
					{/* Main modal */}
					{/*v-if*/}
					<button type='button' className='w-full' />
					<button className='mt-2 w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
						O'chirish
					</button>
					{/*end:: Delete Modal Button*/}
					{/*begin:: Delete Modal Window*/}
					{/*v-if*/}
				</div>
			</div>

			<div className='p-4 border border-gray-200 shadow bg-[#171923] rounded-lg dark:border-gray-700 dark:bg-gray-800'>
				<div className='flex flex-col items-center md:flex-row md:max-w-xl'>
					<img
						className='image-square p-2 rounded-full h-40'
						src='http://64.227.42.134:3030/media\avatars\IMG_75814627-7be5-4d72-b5b9-732cec83b1ab.jpg'
						alt="img"
					/>
					<div className='flex flex-col justify-between ml-3 leading-normal'>
						<h5 className='ml-1 text-2xl font-bold tracking-tight text-white dark:text-white'>
							MuhammadNozim Anvarbekov
						</h5>
						<span className='ml-1 font-normal bold text-gray-700 dark:text-gray-400'>
							nozimjon@mail.ru
						</span>
						<div className='flex items-center font-normal text-gray-700 dark:text-gray-400'>
							<span className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/Star.svg*/}
								
								<AiFillStar size={20} />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'>4.8 Rate </span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/User.svg*/}
								<FaUserTie size="20" />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +1000 students</span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Media/DVD.svg*/}
								<AiFillPlayCircle size="20"/>
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +13 Courses</span>
						</div>
						<div className='flex ml-1 items-center mt-2'>
							<span className='text-white'>

						<MdCalendarMonth size="20" />
							</span>
							<p className='me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								30.08.2023 12:43 PM
							</p>
							<svg
								className='w-4 h-4 text-white dark:text-white'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z' />
								<path d='M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z' />
							</svg>
							<p className='mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								02.09.2023 1:22 AM
							</p>
						</div>
					</div>
				</div>
				<div className='p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151] mt-2 '>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						MuhammadNozim Anvarbekov -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						something gone wrong
					</span>
				</div>
				<div className='mt-3 p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151]'>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						Stack -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						gir gir gir no stack
					</span>
				</div>
				<div className='flex mt-1'>
					{/* Modal toggle */}
					<button className='mt-2 w-full justify-center text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-blue-500'>
						Yangilash
					</button>
					{/* Main modal */}
					{/*v-if*/}
					<button type='button' className='w-full' />
					<button className='mt-2 w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
						O'chirish
					</button>
					{/*end:: Delete Modal Button*/}
					{/*begin:: Delete Modal Window*/}
					{/*v-if*/}
				</div>
			</div>



			<div className='p-4 border border-gray-200 shadow bg-[#171923] rounded-lg dark:border-gray-700 dark:bg-gray-800'>
				<div className='flex flex-col items-center md:flex-row md:max-w-xl'>
					<img
						className='image-square p-2 rounded-full h-40'
						src='http://64.227.42.134:3030/media\avatars\IMG_75814627-7be5-4d72-b5b9-732cec83b1ab.jpg'
						alt="img"
					/>
					<div className='flex flex-col justify-between ml-3 leading-normal'>
						<h5 className='ml-1 text-2xl font-bold tracking-tight text-white dark:text-white'>
							MuhammadNozim Anvarbekov
						</h5>
						<span className='ml-1 font-normal bold text-gray-700 dark:text-gray-400'>
							nozimjon@mail.ru
						</span>
						<div className='flex items-center font-normal text-gray-700 dark:text-gray-400'>
							<span className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/Star.svg*/}
								
								<AiFillStar size={20} />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'>4.8 Rate </span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/General/User.svg*/}
								<FaUserTie size="20" />
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +1000 students</span>
							<span  className="text-[#9F7AEA]">
								{/*begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo8/dist/../src/media/svg/icons/Media/DVD.svg*/}
								<AiFillPlayCircle size="20"/>
								{/*end::Svg Icon*/}
							</span>{' '}
							<span className='mr-2'> +13 Courses</span>
						</div>
						<div className='flex ml-1 items-center mt-2'>
							<span className='text-white'>

						<MdCalendarMonth size="20" />
							</span>
							<p className='me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								30.08.2023 12:43 PM
							</p>
							<svg
								className='w-4 h-4 text-white dark:text-white'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path d='M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z' />
								<path d='M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z' />
							</svg>
							<p className='mx-1 font-normal bold text-gray-700 dark:text-gray-400'>
								02.09.2023 1:22 AM
							</p>
						</div>
					</div>
				</div>
				<div className='p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151] mt-2 '>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						MuhammadNozim Anvarbekov -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						something gone wrong
					</span>
				</div>
				<div className='mt-3 p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#374151]'>
					<span className='font-normal' style={{ color: 'rgb(128, 90, 213)' }}>
						Stack -{' '}
					</span>
					<span className='mb-1 font-normal text-gray-400 dark:text-gray-400'>
						gir gir gir no stack
					</span>
				</div>
				<div className='flex mt-1'>
					{/* Modal toggle */}
					<button className='mt-2 w-full justify-center text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-blue-500'>
						Yangilash
					</button>
					{/* Main modal */}
					{/*v-if*/}
					<button type='button' className='w-full' />
					<button className='mt-2 w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'>
						O'chirish
					</button>
					{/*end:: Delete Modal Button*/}
					{/*begin:: Delete Modal Window*/}
					{/*v-if*/}
				</div>
			</div>
		</div>
		</>
	);
}
