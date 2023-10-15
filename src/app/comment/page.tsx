"use client";
import NewCourses from "@/components/NewCourses/NewCourses";
import Image from "next/image";
import Link from "next/link";
import BgImage from "public/images/react-native.webp";
import instance, { baseUrlImg } from "../api/api";
import { useEffect, useRef, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Modal } from "@/components/Modal/Modal";
import { Pagination } from "@/components/Pagination/Pagination";

export default function Comment() {
  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState<any>([]);
  const [totalPagesPaginate, setTotalPagesPaginate] = useState<any>(1);
  const [createComment, setCreateComment] = useState<boolean>(false);
  const [comment, setComment] = useState([]);
  const [course, setCourse] = useState<any>([]);
  const [commentId, setCommentId] = useState();

  const courseIdRef: any = useRef();

  const getCourseComment = async () => {
    const res = await instance.get(`api/courses?page=${activePage}`);
    // console.log(res.data);

    if (res.status === 200) {
      setCourse(res.data);
      const xPagination = JSON.parse(res.headers["x-pagination"]);
      setTotalPagesPaginate(xPagination?.TotalPages);

      const arr: any = [];
      for (let i = 0; i < xPagination?.TotalPages; i++) {
        arr.push(i);
      }

      setTotalPages(arr);
    }
  };

  const handleChange = (evt: any) => {
    evt.preventDefault();
    setCommentId(evt.target.value);
    getCommentCourse();
  };

  const getCommentCourse = async () => {
    let res = await instance.get(
      `/api/course-comments/course/${commentId}?page=${activePage}`
    );
    setData(res.data);
  };
  const deleteComment = async (evt: any) => {
    let response = await instance.delete(`/api/coursecomments/${evt}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      alert("Delete Comment Course");
      getCourseComment();
    }
  };
  useEffect(() => {
    getCourseComment();
    getCommentCourse();
  }, []);
  // console.log(data);

  return (
    <div className="">
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
                Comments
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex items-center justify-between my-5">
        <h2 className="text-[30px]  lg:text-[36px]  text-black dark:text-white font-semibold  ">
          <span className="text-mainColor">Barcha </span> Commentlar
        </h2>
        <div className="flex  gap-3">
          <select
            onChange={handleChange}
            ref={courseIdRef}
            className="p-2 max-w-[750px] rounded-md"
          >
            {/* <option selected>Change Course Comment</option> */}

            {course.map((el: any) => {
              return <option value={`${el?.id}`}>{el?.name}</option>;
            })}
          </select>
          <select
            onChange={handleChange}
            ref={courseIdRef}
            className="p-2 max-w-[750px] rounded-md"
          >
            <option disabled>Choose a page </option>

            {totalPages?.map((el: any, inx: any) => {
              return (
                <option value={inx + 1} key={inx}>
                  {inx + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-5">
        {data.length > 0
          ? data?.map((el: any) => {
              return (
                <>
                  <div>
                    <h3>{el.fullName}</h3>
                    <h2>{el.comment}</h2>
                  </div>
                </>
              );
            })
          : ""}
      </div>

      <div className="absolute bottom-[80px]">
        <Pagination
          activePage={activePage}
          setActivePage={setActivePage}
          totalPage={totalPagesPaginate}
          // totalPage={totalPage}
        />
      </div>
    </div>
  );
}
