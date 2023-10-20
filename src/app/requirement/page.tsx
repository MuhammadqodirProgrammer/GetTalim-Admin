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
import { BsCalendarDay, BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { ErrorModal } from "@/components/ErrorModal/ErrorModal";

export default function Requirement() {
  const [data, setData] = useState<any>([]);
  const [activePage, setActivePage] = useState(1);
  const [setDataIDDelete, setdeleteIDDelete] = useState<number>();
  const [totalPages, setTotalPages] = useState<any>([]);
  const [totalPagesPaginate, setTotalPagesPaginate] = useState<any>(1);
  const [createComment, setCreateComment] = useState<boolean>(false);
  const [courseRequirement, setCourseRequirement] = useState<boolean>(false);
  const [comment, setComment] = useState([]);
  const [course, setCourse] = useState<any>([]);
  const [commentId, setCommentId] = useState();
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  const courseIdRef: any = useRef();
  const requirementRef: any = useRef();
  const selectRef: any = useRef();

  const getCourseComment = async () => {
    const res = await instance.get(`api/courses?page=${activePage}`);

    if (res?.status === 200) {
      setCourse(res?.data);
    }
  };

  const handleChange = (evt: any) => {
    evt.preventDefault();
    setCommentId(evt.target.value);
    getCommentCourse();
  };

  const getCommentCourse = async () => {
    let res = await instance.get(`/api/courserequirments/course/${commentId}`);

    if (res?.status === 200) {
      setData(res?.data);
    }
  };
  const deleteComment = async (evt: any) => {
    let response = await instance.delete(`/api/courserequirments/${evt}`);
console.log(response);

    if (response?.status === 200) {
      getCourseComment();
      alert("Delete Comment Course");
    } else if (response?.data.unauthorized) {
      setUnauthorized(true);
    }
  };

  const handleCreateRequirement = async (evt: any) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("Requirment", requirementRef?.current?.value);
    formData.append("CourseId", selectRef?.current?.value);

    let res = await instance.post("/api/courserequirments", formData);
    if (res?.status === 200) {
      getCommentCourse();
      setCourseRequirement(false);
    } else if (res?.data.unauthorized) {
      setUnauthorized(true);
    }
  };

  useEffect(() => {
    getCourseComment();
    getCommentCourse();
  }, []);

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
                Requirements
              </a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="flex items-center justify-between my-5">
        <h2 className="text-[30px]  lg:text-[36px]  text-black dark:text-white font-semibold  ">
          <span className="text-mainColor">Barcha </span> Requirementlar
        </h2>
        <div className="flex  gap-3">
          <select
            onChange={handleChange}
            ref={courseIdRef}
            className="p-2 max-w-[750px] rounded-md"
          >
            {/* <option selected>Change Course Comment</option> */}

            {course.map((el: any) => {
              return (
                <option value={`${el?.id}`} key={el?.id}>
                  {el?.name}
                </option>
              );
            })}
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCourseRequirement(true)}
          >
            Create Requirement
          </button>
        </div>
      </div>
      <div className="w-full">
        {data.length > 0
          ? data?.map((el: any) => {
              return (
                <>
                  <div className="card flex border bg-gray-100 mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex-auto p-3">
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {el.requirment}
                      </h5>
                      <div className="w-44">
                        <button
                          className="inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 px-3 py-2 dark:hover:bg-gray-700 dark:hover:text-white"
                          // onClick={openOffcanvas}
                        >
                          <span className="w-full">courses</span>
                          <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-5 mt-3 ">
                        <div className="flex items-center gap-2">
                          <BsCalendarDay size={16} />
                          <p className=" dark:text-gray-400">
                            {new Date(el?.createdAt).getDate() +
                              "." +
                              new Date(el?.createdAt).getMonth() +
                              "." +
                              new Date(el?.createdAt).getFullYear() +
                              " " +
                              new Date(el?.createdAt).getHours() +
                              ":" +
                              new Date(el?.createdAt).getMinutes()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsCalendarDay size={16} />
                          <p className=" dark:text-gray-400">
                            {new Date(el?.updatedAt).getDate() +
                              "." +
                              new Date(el?.updatedAt).getMonth() +
                              "." +
                              new Date(el?.updatedAt).getFullYear() +
                              " " +
                              new Date(el?.updatedAt).getHours() +
                              ":" +
                              new Date(el?.updatedAt).getMinutes()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col p-6 mt-3 gap-3">
                      <button
                        className="bg-[red] rounded-lg p-2"
                        onClick={() => {
                          // setdeleteIDDelete(el?.id);
                          deleteComment(el?.id);
                          // setdeleteModal(true);
                        }}
                      >
                        <BsTrash color={"white"} size={30} />
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          : ""}
      </div>

      <Modal
        width={"40%"}
        title={"Create Requirement"}
        modal={courseRequirement}
        setModal={setCourseRequirement}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={handleCreateRequirement}
          >
            <input
              ref={requirementRef}
              className="w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
              placeholder="Requirement"
              type="text"
            />
            <select
              ref={selectRef}
              className="w-full h-[30px] xl:h-[40px]  xl:w-[328px] p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
            >
              {course.map((el: any) => {
                return (
                  <option value={el.id} key={el?.id}>
                    {el.id}
                  </option>
                );
              })}
            </select>
            <button className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Requirement
            </button>
          </form>
        </div>
      </Modal>

      <ErrorModal modal={unauthorized} setModal={setUnauthorized} />
    </div>
  );
}
