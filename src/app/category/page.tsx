'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsCalendarCheck, BsCalendarDay, BsTrash } from 'react-icons/bs';
import instance from '../api/api';
import toast, { Toaster } from 'react-hot-toast';
import { Modal } from '@/components/Modal/Modal';
import { AiOutlineClose } from 'react-icons/ai';
import { ErrorModal } from '@/components/ErrorModal/ErrorModal';

export default function Category() {
	const [data, setData] = useState<any>([]);
	const [oneData, setOneData] = useState<any>({});
	const [createModal, setCreateModal] = useState<any>(false);
	const [editModal, setEditModal] = useState<any>(false);
	const [deleteModal, setdeleteModal] = useState<any>(false);
	const [deleteID, setdeleteID] = useState<any>();
	const [isOpen, setIsOpen] = useState(false);
	const [unauthorized, setUnauthorized] = useState<any>(false);


	const openOffcanvas = () => {
		setIsOpen(true);
	};

	const closeOffcanvas = () => {
		setIsOpen(false);
	};

	// my refs
	const nameRef = useRef<HTMLInputElement>();
	const descRef = useRef<HTMLInputElement>();

	const editnameRef = useRef<HTMLInputElement>();
	const editdescRef = useRef<HTMLInputElement>();
	// my toasts
	const createNotifcation = () =>
		toast.success('Successfully Created Category');
	const createErrorNotifcation = () =>
		toast.error('Error While Creating Category');
	const editNotifcation = () => toast.success('Successfully Edited Category');
	const deleteNotifcation = () =>
		toast.success('Successfully Deleted Category');
	const editErrorNotifcation = () =>
		toast.error('Error While Editing Category');
	const deleteErrorNotifcation = () =>
		toast.error('Error While Deleting Category');

	const getCategory = async () => {
		let response = await instance.get('/api/categories?page=1', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		setData(response?.data);
		console.log(response?.data);
	};

	useEffect(() => {
		getCategory();
	}, []);

	// create func
	const createFunc = async (e: any) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('name', nameRef?.current?.value || oneData?.name);
		formData.append(
			'description',
			descRef?.current?.value || oneData?.description
		);

		let response = await instance.post(`api/categories`, formData);
		console.log(response, 'res');
		console.log(nameRef?.current?.value, descRef?.current?.value, 'res');

		if (response?.status == 200) {
			setCreateModal(false);
			getCategory();
			createNotifcation();
		}else if(response?.unauthorized ){
			setUnauthorized(true)
		  } else {
			createErrorNotifcation();
		}
	};

	// edit func
	const editFunc = async (e: any) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('name', editnameRef?.current?.value || oneData?.name);
		formData.append(
			'description',
			editdescRef?.current?.value || oneData?.description
		);

		let response = await instance.put(
			`api/categories/${oneData?.id}`,
			formData
		);

		if (response?.status == 200) {
			setEditModal(false);
			getCategory();
			editNotifcation();
		}else if(response?.unauthorized ){
			setUnauthorized(true)
		  } else {
			editErrorNotifcation();
		}
	};

	// delete function
	async function deleteFunc(evt: any) {
		evt.preventDefault();

		const res = await instance.delete(`api/categories/${deleteID}`);
		console.log(res, 'res');
		console.log(deleteID, 'deleteID');

		if (res.status == 200) {
			getCategory();
			setdeleteModal(false);
			deleteNotifcation();
		}else if(res?.unauthorized ){
			setUnauthorized(true)
		  } else {
			deleteErrorNotifcation();
		}
	}
	// get one
	async function GetOne(id: any) {
		const res = await instance.get(`api/categories/${id}`);
		console.log(res);

		setOneData(res?.data);
		setEditModal(true);
	}
	// finish category

	return (
		<div>
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
								Categories
							</a>
						</div>
					</li>
				</ol>

				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					onClick={() => setCreateModal(true)}
				>
					Create Category
				</button>
			</nav>


			{
				data?.length ? (
					data?.map((el: any) => {
						return (
							<>
								<div className='card flex border bg-gray-100 mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
									<div className='flex-auto p-3'>
										<h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
											{el?.name}
										</h5>
										<p className='font-normal text-gray-700 dark:text-gray-400'>
											{el?.description}
										</p>
										<div className='w-44'>
											<button
												className='inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 px-3 py-2 dark:hover:bg-gray-700 dark:hover:text-white'
												// onClick={openOffcanvas}
											>
												<span className='w-full'>courses</span>
												<svg
													className='w-4 h-4 ml-2'
													aria-hidden='true'
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 14 10'
												>
													<path
														stroke='currentColor'
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M1 5h12m0 0L9 1m4 4L9 9'
													/>
												</svg>
											</button>
										</div>
		
										<div className='flex items-center gap-5 mt-3 '>
											<div className='flex items-center gap-2'>
												<BsCalendarDay size={16} />
												<p className=' dark:text-gray-400'>
													{new Date(el?.createdAt).getDate() +
														'.' +
														new Date(el?.createdAt).getMonth() +
														'.' +
														new Date(el?.createdAt).getFullYear() +
														' ' +
														new Date(el?.createdAt).getHours() +
														':' +
														new Date(el?.createdAt).getMinutes()}
												</p>
											</div>
											<div className='flex items-center gap-2'>
												<BsCalendarDay size={16} />
												<p className=' dark:text-gray-400'>
													{new Date(el?.updatedAt).getDate() +
														'.' +
														new Date(el?.updatedAt).getMonth() +
														'.' +
														new Date(el?.updatedAt).getFullYear() +
														' ' +
														new Date(el?.updatedAt).getHours() +
														':' +
														new Date(el?.updatedAt).getMinutes()}
												</p>
											</div>
										</div>
									</div>
									<div className='flex flex-col p-6 mt-3 gap-3'>
										<button
											className='bg-[orange] rounded-lg p-2 '
											onClick={() => GetOne(el?.id)}
										>
											<AiOutlineEdit color={'white'} size={30} />
										</button>
										<button
											className='bg-[red] rounded-lg p-2'
											onClick={() => {
												setdeleteID(el?.id);
												setdeleteModal(true);
											}}
										>
											<BsTrash color={'white'} size={30} />
										</button>
									</div>
								</div>
							</>
						);
					})


				) :"catogorylar yoq ☹"
			
			
			
			
			}

			{/* create modal  */}

			<Modal
				width={'30%'}
				title={'Create Category'}
				modal={createModal}
				setModal={setCreateModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={createFunc}
					>
						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Category name'
								type='text'
								ref={nameRef}
							/>
						</div>

						<div className='flex flex-col gap-2 w-[100%]'>
							<div className='flex flex-col gap-2'>
								<textarea
									rows={3}
									ref={descRef}
									className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  outline-none dark:focus:border-blue-500'
									placeholder='Description...'
									defaultValue={''}
								/>
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
								onClick={() => setCreateModal(false)}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</Modal>

			{/* create modal  */}

			<Modal
				width={'30%'}
				title={'Edit Category'}
				modal={editModal}
				setModal={setEditModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={editFunc}
					>
						<div className='flex flex-col gap-2'>
							<input
								className='w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent '
								placeholder='Category name'
								type='text'
								ref={editnameRef}
								defaultValue={oneData?.name}
							/>
						</div>

						<div className='flex flex-col gap-2 w-[100%]'>
							<div className='flex flex-col gap-2'>
								<textarea
									rows={3}
									ref={editdescRef}
									className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  outline-none dark:focus:border-blue-500'
									placeholder='Description...'
									defaultValue={oneData?.description}
								/>
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
								onClick={() => setEditModal(false)}
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
				title={'Catogory'}
				modal={deleteModal}
				setModal={setdeleteModal}
			>
				<div className=' md:p-5 '>
					<form
						className='flex flex-col items-center gap-3 justify-center'
						onSubmit={deleteFunc}
					>
						<h2 className='mb-2 text-[22px] text-gray-500 dark:text-gray-400'>
							{' '}
							Do you want to delete this category?{' '}
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

			<div
				className={`fixed top-0 left-0 w-[100%] h-screen bg-white dark:bg-[#1F2937] z-50 transform transition-transform duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				{/* Close button */}
				<button
					className='absolute top-4 right-4  text-black dark:text-white  rounded-0'
					onClick={closeOffcanvas}
				>
					<AiOutlineClose size={24} />
				</button>

				{/* Offcanvas content */}
				<div className='p-4'>
					<h2>Offcanvas </h2>
					<p>test uchun.</p>
				</div>
			</div>
			<ErrorModal
modal={unauthorized}
setModal={setUnauthorized}
/>

			<Toaster />
		</div>
	);
}
