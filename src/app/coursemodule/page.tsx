"use client"

import NewCourses from "@/components/NewCourses/NewCourses";
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';
import instance, { baseUrlImg } from '../api/api';
import { VideoSkeleton } from '@/components/Skeleton/Skeleton';
import Image from "../../../node_modules/next/image";




export default function Courses() {



	const [videoModal, setVideoModal] = useState(false);
	const [videoID, setVideoID] = useState<any>();
	const [createVideoModal, setcreateVideoModal] = useState(false);
	const [videos, setVideos] = useState<any>([]);
	const [courses, setCourses] = useState<any>([]);
	const [totalPages, setTotalPages] = useState<any>([]);

	const getCourse = () => {
		instance
			.get(`api/courses?page=1`)
			.then((res: any) => {
			
				if (res?.data?.length) {
					setCourses(res?.data)

					const xPagination =JSON.parse(res?.headers["x-pagination"]);
					console.log(res?.data, 'courses');
					console.log(xPagination, 'xPagination');
					setTotalPages(xPagination?.TotalPages)
				}
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

  async function getId(id:any) {
    console.log(id ,"id");
    
    localStorage.setItem("course_id" , id)
  }
  useEffect(() => {
		getCourse()
	}, []);



  return (
    <div className=" px-4 mx-auto ">
      <nav className="flex justify-between " aria-label="Breadcrumb">
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
                Course
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <h2 className="text-[30px]  lg:text-[36px] my-4  text-black dark:text-white font-semibold">
        <span className="text-mainColor">Kurslarni  </span> tanlang va  <span className="text-mainColor">module</span> qo'shing
      </h2>
      <div className="flex flex-wrap gap-5">
      {courses?.map((el: any) => {
        return (
          <>
            <Link
            onClick={()=> getId(el?.id)}
              href={`module`}
              className="flex flex-col relative w-full lg:w-[31%] bg-[#eee] dark:bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto border border-[#ddd] dark:border-none"
            >
              <Image
                className="h-[250px]  w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
                src={`${baseUrlImg}/${el.imagePath}`}
                alt="Picture of the course"
                width={"1000"}
                height={"1000"}
              />
              <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
                mobil dastur
              </h5>
              <h6 className="pt-3 pb-3 font-medium text-[black] dark:text-white text-center">
                {el.name}
              </h6>
              <hr className="h-1 w-full bg-[#000] dark:bg-CoursesHr" />
              <div className="flex justify-between pt-5 items-center">
                <div className="flex gap-3 text-white items-center">
                  <button className="text-slate-700 dark:text-newCourcesBtn font-medium border border-solid border-[purple] dark:border-newCourcesBtn px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover">
                    batafsil
                  </button>
                </div>
                <div className="flex gap-3 text-[black] dark:text-white items-center">
                  <p className="text-sm line-through">{el.price}</p>
                  <p className="font-bold">Bepul</p>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>


    </div>
  );
}
