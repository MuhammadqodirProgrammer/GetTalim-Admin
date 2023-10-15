"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { BsCalendarCheck, BsCalendarDay, BsTrash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { VideoSkeleton } from '@/components/Skeleton/Skeleton';
import ReactPlayer from 'react-player';
import { AiOutlineEdit } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';

import instance from "../api/api";
import toast, { Toaster } from "react-hot-toast";
import { Pagination } from "@/components/Pagination/Pagination";
const notify = () => toast.success("Successfully Created Module");
const notify2 = () => toast.error("Error While Creating Module");
const notify3 = () => toast.success("Successfully Edited Module");
const notify4 = () => toast.success("Successfully Deleted Module");
const notify5 = () => toast.error("Error While Editing Module");
const notify6 = () => toast.error("Error While Deleting Module");

export default function Module() {
	const myCourseId = localStorage.getItem('course_id');

  const [data, setData] = useState<any>([]);
  const [oneData, setOneData] = useState<any>({});
  const [oneDataForVideos, setOneDataForVideos] = useState<any>({});
  const [courses, setCourses] = useState<any>([]);
  const [moduleVideos, setModuleVideos] = useState<any>([]);
  const [showModal, setShowModal] = useState<any>(false);
  const [editshowModal, setEditShowModal] = useState<any>(false);
  const [Id, handleId] = useState<any>("");
  const [activePage, setActivePage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState(false);

  
  const openOffcanvas = () => {
    setIsOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOpen(false);
  };


  const getCourseModules = async () => {
		instance
			.get(`api/CourseModuls/videos/student/${myCourseId}`)
			.then((res: any) => {
				console.log(res?.data ,"result my data videosss ");
				
				if (res.data?.length) {
					setData(res?.data);
	
				}
			})
			.catch((err: any) => {
				console.log(err);
			});
	};


  const getCourse = () => {
    instance
      .get(`/api/courses`)
      .then((res: any) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  // const getModule = async () => {
  //   let response = await instance.get(`/api/CourseModuls?page=${activePage}`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setData(response.data);
  //   console.log(response.data);
  // };

  useEffect(() => {
    getCourseModules()
    getCourse();
    getCourseModules()
  }, []);

  // const nameRef: any = useRef();
  const nameRef = useRef<any>(null);
  const courseIdRef = useRef<any>();
  const editnameRef = useRef<any>();
  const editcourseIdRef = useRef<any>();
  const token = localStorage.getItem("token");

  async function handleSubmit(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", nameRef?.current.value);
    data.append("courseId", courseIdRef?.current.value);

    let response = await instance.post("/api/CourseModuls", data);

    if (response.status === 200 && response.data == true) {
      notify();
      setShowModal(false);
      getCourseModules()
    } else if (response.data == false) {
      notify2();
    } else {
      notify2();
    }
  }

  async function handleDelete(evt: any) {
    evt.preventDefault();
    const id = evt.target.closest("button").id;
    let response = await instance.delete(`/api/CourseModuls/${id}`);

    if (response.status === 200 && response.data == true) {
      notify4();
      getCourseModules()
    } else {
      notify6();
    }
  }

  async function handleEditSubmit(evt: any) {
    evt.preventDefault();
    const data = new FormData();
    data.append("name", editnameRef.current.value || oneData?.name);
    data.append("courseId", editcourseIdRef.current.value || oneData?.courseId);
    const mydata ={
name:editnameRef.current.value || oneData?.name,
courseId: editcourseIdRef.current.value || oneData?.courseId
    }
    console.log(mydata ,Id,"ddfdf");
    

    let response = await instance.put(`/api/CourseModuls/${Id}`, data);

    if (response.status === 200 && response.data == true) {
      notify3();
      setEditShowModal(false);
      getCourseModules()
    } else {
      notify5();
    }
  }


  async function GetOne(id: any) {
		const res = await instance.get(`api/CourseModuls/${id}`);
		setEditShowModal(true);
    handleId(id)
		if (res.status == 200) {
			setOneData(res?.data);
		}
	}

  async function GetModuleVideos(id: any) {
		const res = await instance.get(`api/videos/modul/${id}`);
		const res2 = await instance.get(`api/CourseModuls/${id}`);

    console.log(res ,"resssssssssssssss videos moduel");
		
		if (res.status == 200) {
      setModuleVideos(res?.data)
      setOneDataForVideos(res2?.data)
      openOffcanvas()
		}
	}
  console.log(oneData ,"oneData");





  // start video code 



	const [videoModal, setVideoModal] = useState(false);
	const [videoID, setVideoID] = useState<any>();
	const [createVideoModal, setcreateVideoModal] = useState(false);
	const [videos, setVideos] = useState<any>([]);
	const [totalPages, setTotalPages] = useState<any>([]);
	const [createVideo, setcreateVideo] = useState<any>({});
	const videoUrl = 'https://youtu.be/5oH9Nr3bKfw?si=Jx9C41T3R6fItjpg';
	const videoNameRef: any = useRef<HTMLInputElement>();
	const videoPathRef: any = useRef<HTMLInputElement>();
	const videoLengthRef: any = useRef<HTMLInputElement>();
	const courseModulIdRef: any = useRef<HTMLInputElement>();

	// const getCourseModules = async () => {
	// 	instance
	// 		.get(`api/CourseModuls/videos/student/${'myCourseId'}`)
	// 		.then((res: any) => {
	// 			console.log(res?.data ,"result my data videosss ");
				
	// 			if (res.data?.length) {
	// 				setVideos(res?.data?.[0]?.videos)
	// 				setCourses(res?.data);
	// 				const xPagination = JSON.parse(res.headers['x-pagination']);
	// 				console.log(xPagination, 'courses xpagination');
	// 				const arr: any = [];
	// 				for (let i = 0; i < xPagination?.TotalPages; i++) {
	// 					arr.push(i);
	// 				}

	// 				setTotalPages(arr);
	// 			}
	// 		})
	// 		.catch((err: any) => {
	// 			console.log(err);
	// 		});
	// };



	const createVideoFunc = async (e: any) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append('name', videoNameRef?.current?.value);
		formData.append('path', videoPathRef?.current?.value);
		formData.append('length', videoLengthRef?.current?.value);
		formData.append('CourseModulId', courseModulIdRef?.current?.value);

		console.log(
			videoNameRef?.current?.value,
			videoPathRef?.current?.value,
			videoLengthRef?.current?.value
		);

		let response = await instance.post(`api/videos`, formData);
		// setData(response.data);
		console.log(response, 'response');
	};





  return (
    <div>
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
                Course Module
              </a>
            </div>
          </li>
        </ol>
        <div>
          <button
            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Create New
          </button>
        </div>
      </nav>
      {data.map((el: any) => {
        return (
          <>
            <div className="card flex border bg-gray-100 mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700   ">
              <div className="flex-auto p-3 relative">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {el.name}
                </h5>
                <div className="w-44">
                <button className='inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 px-3 py-2 dark:hover:bg-gray-700 dark:hover:text-white' onClick={()=>GetModuleVideos(el?.id)} >
										<span className='w-full'>Add video</span>
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
                <div className="flex items-center gap-5 absolute bottom-1">
                  <div className="flex items-center gap-2">
                    <BsCalendarDay size={16} />
                    <p className=" dark:text-gray-400">
                      {new Date(el.createdAt).getDate() +
                        "." +
                        new Date(el.createdAt).getMonth() +
                        "." +
                        new Date(el.createdAt).getFullYear() +
                        " " +
                        new Date(el.createdAt).getHours() +
                        ":" +
                        new Date(el.createdAt).getMinutes()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCalendarCheck size={16} />
                    <p className=" dark:text-gray-400">
                      {new Date(el.updatedAt).getDate() +
                        "." +
                        new Date(el.updatedAt).getMonth() +
                        "." +
                        new Date(el.updatedAt).getFullYear() +
                        " " +
                        new Date(el.updatedAt).getHours() +
                        ":" +
                        new Date(el.updatedAt).getMinutes()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 mt-3 gap-3">
                <button
                  className="bg-[orange] rounded-lg p-2 "
                  id={el.id}
                  onClick={() => {
                    GetOne(el?.id)
                  }}
                >
                  <AiOutlineEdit color={"white"} size={30} id={el.id} />
                </button>
                <button
                  className="bg-[red] rounded-lg p-2"
                  onClick={handleDelete}
                  id={el.id}
                >
                  <BsTrash color={"white"} size={30} id={el.id} />
                </button>
              </div>
            </div>
          </>
        );
      })}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[100%] my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-bgColor dark:bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-bold uppercase text-white dark:text-black">
                    Create Module
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-white dark:text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      &times;
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  className="relative p-6 flex-auto"
                  onSubmit={handleSubmit}
                >
                  <input
                    ref={nameRef}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Module Name"
                  />
                  <select
                    ref={courseIdRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                  >
                 
                    {courses.map((item: any) => {
                      if(item?.id ==myCourseId){
                       return <option selected value={item.id}>{item.name}</option>
                      } else{
                       return <option  value={item.id}>{item.name}</option>

                      }
                    })}
                  </select>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="reset"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {editshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[100%] my-6 mx-auto max-w-xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-bold uppercase  text-black">Edit Module</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl font-semibold outline-none focus:outline-none"
                    onClick={() => setEditShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      &times;
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form
                  className="relative p-6 flex-auto"
                  onSubmit={handleEditSubmit}
                >
                  <input
                    ref={editnameRef}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Module Name"
                    defaultValue={oneData?.name}
                  />
                  <select
                    ref={editcourseIdRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
                  >
                    {courses.map((item: any) => {
                      if(item?.id ==oneData?.courseId){
                       return <option selected value={item.id}>{item.name}</option>
                      } else{
                       return <option  value={item.id}>{item.name}</option>

                      }
                    })}
                  </select>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="reset"
                      onClick={() => setEditShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}



<div className={`fixed top-0 left-0 w-[100%] h-screen bg-white dark:bg-[#1F2937] z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
 {/* Close button */}
      <button className="absolute top-4 right-4  text-black dark:text-white  rounded-0" onClick={closeOffcanvas}>
        <AiOutlineClose size={24} />
      </button>



      {/* Offcanvas content */}
      <div className="p-4">
        <h2>Offcanvas Content</h2>



        <div className="card flex border bg-gray-100 mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700   ">
              <div className="flex-auto p-3 relative">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {oneDataForVideos?.name}
                </h5>
                <div className="w-44">
                <button className='inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 px-3 py-2 dark:hover:bg-gray-700 dark:hover:text-white' onClick={()=>GetModuleVideos(el?.id)} >
										<span className='w-full'>Add video</span>
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
                <div className="flex items-center gap-5 absolute bottom-1">
                  <div className="flex items-center gap-2">
                    <BsCalendarDay size={16} />
                    <p className=" dark:text-gray-400">
                      {new Date(oneDataForVideos?.createdAt).getDate() +
                        "." +
                        new Date(oneDataForVideos?.createdAt).getMonth() +
                        "." +
                        new Date(oneDataForVideos?.createdAt).getFullYear() +
                        " " +
                        new Date(oneDataForVideos?.createdAt).getHours() +
                        ":" +
                        new Date(oneDataForVideos?.createdAt).getMinutes()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCalendarCheck size={16} />
                    <p className=" dark:text-gray-400">
                      {new Date(oneDataForVideos?.updatedAt).getDate() +
                        "." +
                        new Date(oneDataForVideos?.updatedAt).getMonth() +
                        "." +
                        new Date(oneDataForVideos?.updatedAt).getFullYear() +
                        " " +
                        new Date(oneDataForVideos?.updatedAt).getHours() +
                        ":" +
                        new Date(oneDataForVideos?.updatedAt).getMinutes()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 mt-3 gap-3">
                <button
                  className="bg-[orange] rounded-lg p-2 "
                  id={oneDataForVideos?.id}
                  onClick={() => {
                    GetOne(el?.id)
                  }}
                >
                  <AiOutlineEdit color={"white"} size={30} id={oneDataForVideos?.id} />
                </button>
                <button
                  className="bg-[red] rounded-lg p-2"
                  onClick={handleDelete}
                  id={oneDataForVideos?.id}
                >
                  <BsTrash color={"white"} size={30} id={oneDataForVideos?.id} />
                </button>
              </div>
            </div>

        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
				{moduleVideos?.length ? (
					moduleVideos?.map((el: any) => {
						return (
							<div
								className=' bg-white dark:bg-[#111827] shadow-lg rounded-lg overflow-hidden my-4'
								key={el?.id}
							>
								<ReactPlayer
									url={el?.videoPath}
									controls
									className='w-full h-56 object-cover object-center'
								/>

								<div className='py-4 px-6'>
									<h1 className='text-2xl font-semibold text-gray-600'>
										{el?.name}
									</h1>

									<div className='flex items-center mt-4 text-gray-600'>
										<GiSandsOfTime size='25' />
										<h1 className='px-2 text-sm'>
											{' '}
											Video davomiyligi: {el.length}{' '}
										</h1>
									</div>
								</div>
								<div className='flex items-center  justify-center gap-x-3 pb-3'>
									<button
										className='bg-[orange] rounded-lg p-2 '
										onClick={() => {
											GetOne(el?.id);
										}}
									>
										<AiOutlineEdit color={'white'} size={30} />
									</button>
									<button className='bg-[red] rounded-lg p-2 '>
										<BsTrash color={'white'} size={30} />
									</button>
								</div>
							</div>
						);
					})
				) : (
					<div className='flex w-ful items-center lg:justify-between  justify-center lg:flex-nowrap flex-wrap gap-x-3 '>
						{' '}
						<VideoSkeleton /> <VideoSkeleton /> <VideoSkeleton />{' '}
					</div>
				)}
			</div>

      </div>
     





    </div>

   
      <Toaster />
    </div>
  );
}
