'use client';
import { ErrorModal } from '@/components/ErrorModal/ErrorModal';
import { Modal } from '@/components/Modal/Modal';
import NewCourses from '@/components/NewCourses/NewCourses';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import instance from '../api/api';

export default function Courses() {
	const [createCourse, setCreateCourse] = useState<boolean>(false);
	const [data, setData] = useState<any>([]);
	const [totlaPage, setTotlaPage] = useState<any>();
	const [activePage, setActivePage] = useState<any>(1);
	const [unauthorized, setUnauthorized] = useState<any>(false);

	const createName: any = useRef<HTMLInputElement>();
	const createDescription: any = useRef<HTMLInputElement>();
	const createInformation: any = useRef<HTMLInputElement>();
	const createLessons: any = useRef<HTMLInputElement>();
	const createLevel: any = useRef<HTMLInputElement>();
	const createLanguages: any = useRef<HTMLInputElement>();
	const createHours: any = useRef<HTMLInputElement>();
	const createPrice: any = useRef<HTMLInputElement>();
	const createDiscountPrice: any = useRef<HTMLInputElement>();
	const createMentorId: any = useRef<HTMLInputElement>();
	const createCategoryId: any = useRef<HTMLInputElement>();
	const createImage: any = useRef<HTMLInputElement>();
	const getCourse = async () => {
		let res = await instance.get(`/api/courses?page=${activePage}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res?.data?.length) {
			setData(res?.data);
			const xPagination = JSON.parse(res?.headers['x-pagination']);
			setTotlaPage(xPagination?.TotalPages);
		}
	};
	// console.dir(createImage?.current, "images 233");

	const handleCreate = async (evt: any) => {
		evt.preventDefault();
		const formData = new FormData();
		formData.append('Name', createName?.current?.value);
		formData.append('Description', createDescription?.current?.value);
		formData.append('Information', createInformation?.current?.value);
		formData.append('Lessons', createLessons?.current?.value);
		formData.append('Level', createLevel?.current?.value);
		formData.append('Languages', createLanguages?.current?.value);
		formData.append('Hourse', createHours?.current?.value);
		formData.append('Price', createPrice?.current?.value);
		formData.append('DiscountPrice', createDiscountPrice?.current?.value);
		formData.append('MentorId', createMentorId?.current?.value);
		formData.append('CategoryId', createCategoryId?.current?.value);
		formData.append('Image', createImage?.current?.files[0]);

		const res = await instance.post('/api/courses', formData);

		if (res?.status === 200) {
			getCourse();
			setCreateCourse(false);
		} else if (res?.unauthorized) {
			setUnauthorized(true);
		}
	};

	useEffect(() => {
		getCourse();
	}, []);

	return (
		<>
			<div className=' px-4 mx-auto '>
				<nav className='flex justify-between mb-3' aria-label='Breadcrumb'>
					<ol className='inline-flex items-center space-x-1 md:space-x-3'>
						<li className='inline-flex items-center'>
							<Link href='/dashboard'>
								<Link
									href='#'
									className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
								>
									<svg
										className='w-3 h-3'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 20 20'
									>
										<path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
									</svg>
								</Link>
							</Link>
						</li>
						<li>
							<div className='flex items-center'>
								<svg
									className='w-3 h-3 text-gray-400 mx-1'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 6 10'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='m1 9 4-4-4-4'
									/>
								</svg>
								<a className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white'>
									Course
								</a>
							</div>
						</li>
					</ol>
				</nav>
				<div className='flex items-center justify-between'>
					<h2 className='text-[30px]  lg:text-[36px] my-5  text-black dark:text-white font-semibold pt-8 '>
						<span className='text-mainColor'>Barcha </span> kurslar
					</h2>
					<div>
						<button
							className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
							onClick={() => setCreateCourse(true)}
						>
							Create Student
						</button>
					</div>
				</div>
				<NewCourses myHref='/singleProduct' data={data} totalPage={totlaPage} />
			</div>

			{/* create */}
			<Modal
				width={'50%'}
				title={'Create Course'}
				modal={createCourse}
				setModal={setCreateCourse}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={handleCreate}
					>
						<div className='flex flex-wrap gap-3'>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Name'
								type='text'
								ref={createName}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Description'
								type='text'
								ref={createDescription}
							/>

							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Information'
								type='text'
								ref={createInformation}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Lessons'
								type='number'
								ref={createLessons}
							/>

							<select
								ref={createLevel}
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
							>
								<option selected disabled value='Select'>
									Level
								</option>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
							</select>
							<select
								ref={createLanguages}
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
							>
								<option selected disabled value='Select'>
									Languages
								</option>
								<option value={0}>0</option>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</select>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Hours'
								type='number'
								ref={createHours}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Price'
								type='number'
								ref={createPrice}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='DiscountPrice'
								type='number'
								ref={createDiscountPrice}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='MentorId'
								type='number'
								ref={createMentorId}
							/>
							<input
								className='w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='CategoryId'
								type='number'
								ref={createCategoryId}
							/>
						</div>
						<div className='flex flex-col gap-2 w-[100%]'>
							<div className='flex items-center justify-center w-full'>
								<label
									htmlFor='dropzone-file-create'
									className=' relative flex flex-col items-center justify-center w-full h-[95px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
								>
									<div className='flex flex-col items-center justify-center pt-3 pb-4'>
										<svg
											className='w-8 h-6 mb-4 text-gray-500 dark:text-gray-400'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 20 16'
										>
											<path
												stroke='currentColor'
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
											/>
										</svg>

										<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
											<span className='font-semibold'>Click to upload</span> and
											img
										</p>
									</div>
									<input
										id='dropzone-file-create'
										type='file'
										className='hidden'
										ref={createImage}
									/>
								</label>
							</div>
						</div>

						<div className='flex gap-x-2'>
							<button
								className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								type='submit'
							>
								Add
							</button>
							<button
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								type='button'
								onClick={() => setCreateCourse(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			<ErrorModal modal={unauthorized} setModal={setUnauthorized} />
		</>
	);
}
