'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import demo from '../../../public/images/logo2.png';
import Image from 'next/image';
import { BsCalendarDay } from 'react-icons/bs';
import { Modal } from '@/components/Modal/Modal';
import { FaUserTie } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { AiFillPlayCircle } from 'react-icons/ai';
import { MdCalendarMonth } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

import { AiOutlineEdit } from 'react-icons/ai';
import { BsTrash, BsFillTelephoneFill } from 'react-icons/bs';
import { GiSandsOfTime } from 'react-icons/gi';
import instance, { baseUrlImg } from '../api/api';
import { VideoSkeleton } from '@/components/Skeleton/Skeleton';
import { Pagination } from '@/components/Pagination/Pagination';
import userImg from '../../../public/images/user.png';
import { ErrorModal } from '@/components/ErrorModal/ErrorModal';

export default function Student() {
	const [createVideoModal, setcreateVideoModal] = useState(false); // mentor states
	const [mentor, setMentor] = useState(false);
	const [activePage, setActivePage] = useState(1);
	const [mentorID, setMentorID] = useState<any>();
	const [deleteID, setDeleteID] = useState<any>();
	const [createMentor, setCreateMentor] = useState(false);
	const [editMentor, setEditMentor] = useState(false);
	const [deleteModal, setdeleteModal] = useState(false);
	const [students, setStudents] = useState<any>([]);
	const [totalPages, setTotalPages] = useState<any>(1);
	const [oneData, setOneData] = useState<any>({});
	const [unauthorized, setUnauthorized] = useState<any>(false);

	//  edutr refs
	const editfirstNameRef: any = useRef<HTMLInputElement>();
	const editlastNameRef: any = useRef<HTMLInputElement>();
	const editimgRef: any = useRef<HTMLInputElement>();
	const editemailRef: any = useRef<HTMLInputElement>();
	const editPhoneRef: any = useRef<HTMLInputElement>();
	const editMaleRef: any = useRef<HTMLInputElement>();
	// my toasts

	const editNotifcation = () => toast.success('Successfully Edited Mentor');
	const deleteNotifcation = () => toast.success('Successfully Deleted Mentor');
	const editErrorNotifcation = () => toast.error('Error While Editing Mentor');
	const deleteErrorNotifcation = () =>
		toast.error('Error While Deleting Mentor');

	// get students
	const getStudents = async () => {
		const res = await instance.get(`api/students?page=${activePage}`);

		if (res?.status == 200) {
			setStudents(res?.data);
			const xPagination = JSON.parse(res?.headers['x-pagination']);

			setTotalPages(xPagination?.TotalPages);
		}
	};

	// search by full name
	const searchByFullName = async (evt: any) => {
		if (evt.target?.value) {
			const res = await instance.get(
				`api/students/search-full-name/${evt.target?.value}?page=${activePage}`
			);

			if (res?.status == 200) {
				setStudents(res?.data);
				const xPagination = JSON.parse(res?.headers['x-pagination']);

				setTotalPages(xPagination?.TotalPages);
			}
		} else {
			getStudents();
		}
	};

	// search by email
	const searchByEmail = async (evt: any) => {
		if (evt.target?.value) {
			const res = await instance.get(
				`api/students/search-email/${evt.target?.value}?page=${activePage}`
			);

			if (res?.status == 200) {
				setStudents(res?.data);
				const xPagination = JSON.parse(res?.headers['x-pagination']);

				setTotalPages(xPagination?.TotalPages);
			}
		} else {
			getStudents();
		}
	};

	// edit func
	const editMentorFunc = async (e: any) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append(
			'firstName',
			editfirstNameRef?.current?.value || oneData?.firstName
		);
		formData.append(
			'lastName',
			editlastNameRef?.current?.value || oneData?.lastName
		);
		formData.append(
			'imagePath',
			editimgRef?.current?.files[0] || oneData?.imagePath
		);
		formData.append('email', editemailRef?.current?.value || oneData?.email);
		formData.append(
			'phoneNumber',
			editPhoneRef?.current?.value || oneData?.phoneNumber
		);
		formData.append('isMale', editMaleRef?.current?.value || oneData?.isMale);

		let response = await instance.put(
			`api/admin/student/${oneData?.id}`,
			formData
		);

		if (response?.status == 200) {
			setEditMentor(false);
			getStudents();
			editNotifcation();
		} else if (response?.unauthorized) {
			setUnauthorized(true);
		} else {
			editErrorNotifcation();
		}
	};

	// delete function
	async function deleteFunc(evt: any) {
		evt.preventDefault();

		const res = await instance.delete(`api/admin/student/${deleteID}`);

		if (res?.status == 200) {
			getStudents();
			setdeleteModal(false);
			deleteNotifcation();
		} else if (res?.unauthorized) {
			setUnauthorized(true);
		} else {
			deleteErrorNotifcation();
		}
	}

	useEffect(() => {
		getStudents();
	}, []);

	async function GetOne(id: any) {
		const findOne = await students.find((el: any) => el?.id == id);
		setOneData(findOne);
		setEditMentor(true);
	}

	return (
		<div>
			<nav
				className='flex justify-between mb-3 items-center '
				aria-label='Breadcrumb'
			>
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
								Students
							</a>
						</div>
					</li>
				</ol>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setcreateVideoModal(true)}
				>
					Create Student
				</button>
			</nav>

			<div className='flex items-center  justify-center gap-5  mb-[20px]  md:justify-between   sm:flex-nowrap flex-wrap  w-[100%] '>
				<div className='flex bg-gray-100 dark:bg-[#374151] gap-x-4 p-2 w-[100%] sm:w-[40%] space-x-4 rounded-lg'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 opacity-30'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
					<input
						className='bg-gray-100 outline-none dark:bg-[#374151] w-[100%]'
						type='search'
						placeholder='Search  by fullName...'
						onChange={searchByFullName}
					/>
				</div>

				<div className='flex bg-gray-100 dark:bg-[#374151] gap-x-4 p-2 w-[100%] sm:w-[40%] space-x-4 rounded-lg'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 opacity-30'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
					<input
						className='bg-gray-100 outline-none dark:bg-[#374151] w-[100%]'
						type='search'
						placeholder='Search  by emal...'
						onChange={searchByEmail}
					/>
				</div>
			</div>

			<div className='flex flex-wrap gap-3 md:justify-start justify-center'>
				{students.length ? (
					students.map((el: any): any => (
						<div
							className='shadow bg-white dark:bg-cardColor flex flex-col justify-start  items-center p-3 rounded-lg w-full sm:max-w-[230px]'
							key={el?.id}
						>
							<Image
								src={el?.imagePath ? `${baseUrlImg}/${el?.imagePath}` : userImg}
								width={100}
								height={100}
								alt='pic'
								className=' rounded-full w-[90px] h-[90px]  object-cover  '
							/>
							<div className='mt-2'>
								<h4 className='text-black dark:text-white font-semibold text-[18px]'>
									{(el?.firstName + ' ' + el?.lastName).slice(0, 15)}..
								</h4>
								<p className='text-[grey]'>{el?.email}</p>
								<div className='flex gap-2 mt-2 text-grey'>
									<BsFillTelephoneFill className='text-[#9F7AEA] dark:text-white ' />

									<p className='text-[grey] text-[14px]'>
										{el?.phoneNumber ? el?.phoneNumber : 'no phone '}
									</p>
								</div>
								<div className='flex gap-2 mt-2 text-grey'>
									<BsCalendarDay className='text-[#9F7AEA] dark:text-white ' />

									<p className='text-[grey] text-[14px]'>
										{el?.createdAt?.split('T')[0] +
											' ' +
											el?.createdAt?.split('T')[1].slice(0, 5)}
									</p>
								</div>
								<div className='flex gap-2 mt-2'>
									<BsCalendarDay className='text-[#9F7AEA] dark:text-white ' />
									<p className='text-[grey] text-[14px]'>
										{el?.updatedAt?.split('T')[0] +
											' ' +
											el?.updatedAt?.split('T')[1].slice(0, 5)}
									</p>
								</div>
								<div className='flex flex-col gap-2 mt-2'>
									<button
										className='p-2 rounded-md bg-[blue] text-white'
										onClick={() => GetOne(el?.id)}
									>
										Edit
									</button>
									<button
										className='p-2 rounded-md bg-[red] text-white'
										onClick={() => {
											setdeleteModal(true);
											setDeleteID(el?.id);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<div className='flex w-ful items-center lg:justify-between  justify-center lg:flex-nowrap flex-wrap gap-x-3 '>
						{' '}
						<VideoSkeleton /> <VideoSkeleton /> <VideoSkeleton />{' '}
					</div>
				)}
			</div>

			<Pagination
				activePage={activePage}
				setActivePage={setActivePage}
				totalPage={totalPages}
				// totalPage={totalPage}
			/>

			{/* edit modal  */}

			<Modal
				width={'900px'}
				title={'Edit Student'}
				modal={editMentor}
				setModal={setEditMentor}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={editMentorFunc}
					>
						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Edit Student firstName'
								type='text'
								defaultValue={oneData?.firstName}
								ref={editfirstNameRef}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Edit Student lastName'
								type='text'
								defaultValue={oneData?.lastName}
								ref={editlastNameRef}
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  '
								placeholder='Edit  Mentor email'
								type='text'
								defaultValue={oneData?.email}
								ref={editemailRef}
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
								placeholder='Edit Student phone'
								type='text'
								defaultValue={oneData?.phoneNumber}
								ref={editPhoneRef}
							/>
						</div>

						<div className='flex flex-col gap-2 w-full'>
							<select
								ref={editMaleRef}
								className='w-full p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 '
							>
								<option selected disabled value='Select'>
									select Male
								</option>
								<option value={true}>true</option>
								<option value={false}>false</option>
							</select>
						</div>
						<div className='flex flex-col gap-2 w-[100%]'>
							<div className='flex items-center justify-center w-full'>
								<label
									htmlFor='dropzone-file'
									className=' relative flex flex-col items-center justify-center w-full h-[95px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
								>
									<div className='flex flex-col items-center justify-center pt-3 pb-4'>
										{oneData?.imagePath ? (
											<Image
												width={100}
												height={100}
												className='w-[100%] object-cover h-[90px] rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400'
												src={`${baseUrlImg}/${oneData?.imagePath}`}
												alt='img'
											/>
										) : (
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
										)}

										<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
											<span className='font-semibold'>Click to upload</span> and
											edit img
										</p>
									</div>
									<input
										id='dropzone-file'
										type='file'
										className='hidden'
										ref={editimgRef}
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
								onClick={() => setEditMentor(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			{/* delete modal  */}

			<Modal
				width={'480px'}
				title={'Student'}
				modal={deleteModal}
				setModal={setdeleteModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={deleteFunc}
					>
						<h2 className='mb-2 text-[22px] text-gray-500 dark:text-gray-400'>
							Do you want to delete this student?{' '}
						</h2>
						<div className='flex gap-x-2'>
							<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
								Yes
							</button>
							<button
								type='button'
								className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								onClick={() => setdeleteModal(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			<ErrorModal modal={unauthorized} setModal={setUnauthorized} />

			<Toaster />
		</div>
	);
}
