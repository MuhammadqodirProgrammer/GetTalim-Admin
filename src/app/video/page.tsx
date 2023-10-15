"use client";
import Link from "next/link";
import ReactPlayer from "react-player";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { Modal } from "@/components/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import instance from "../api/api";
import { VideoSkeleton } from "@/components/Skeleton/Skeleton";

export default function Page() {
  const myCourseId = localStorage.getItem("course_id");

  const [videoModal, setVideoModal] = useState(false);
  const [videoID, setVideoID] = useState<any>();
  const [createVideoModal, setcreateVideoModal] = useState(false);
  const [videos, setVideos] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>([]);
  const [createVideo, setcreateVideo] = useState<any>({});
  const videoUrl = "https://youtu.be/5oH9Nr3bKfw?si=Jx9C41T3R6fItjpg";
  const videoNameRef: any = useRef<HTMLInputElement>();
  const videoPathRef: any = useRef<HTMLInputElement>();
  const videoLengthRef: any = useRef<HTMLInputElement>();
  const courseModulIdRef: any = useRef<HTMLInputElement>();

  const getCourseModules = async () => {
    instance
      .get(`api/CourseModuls/videos/student/${myCourseId}`)
      .then((res: any) => {
        console.log(res?.data, "result my data ");

        if (res.data?.length) {
          setVideos(res?.data?.[0]?.videos);
          setCourses(res?.data);
          const xPagination = JSON.parse(res.headers["x-pagination"]);
          console.log(xPagination, "courses");
          const arr: any = [];
          for (let i = 0; i < xPagination?.TotalPages; i++) {
            arr.push(i);
          }

          setTotalPages(arr);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  async function getModules() {
    const res = await instance.get("api/CourseModuls?page=1");

    console.log(res?.data, "resss");
  }

  const createVideoFunc = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", videoNameRef?.current?.value);
    formData.append("path", videoPathRef?.current?.value);
    formData.append("length", videoLengthRef?.current?.value);
    formData.append("CourseModulId", courseModulIdRef?.current?.value);

    console.log(
      videoNameRef?.current?.value,
      videoPathRef?.current?.value,
      videoLengthRef?.current?.value
    );

    let response = await instance.post(`api/videos`, formData);
    // setData(response.data);
    console.log(response, "response");
  };

  useEffect(() => {
    getCourseModules();
    getModules();
    // getCourse();
    // getVideos();
  }, []);
  console.log(videos, "result my  videos data ");
  console.log(myCourseId, "myCourseIda ");

  async function moduleChangeFunc(evt: any) {
    evt.preventDefault();

    console.log(evt.target?.value, "change value");
    setCourses(courses?.[evt.target?.value]?.videos);
  }

  async function GetOne(id: any) {
    setVideoModal(true);
    // setVideoID(el?.id)
    instance
      .get(`api/videos?page=1`)
      .then((res: any) => {
        console.log(res.data, "data");
        if (res.data?.length) {
          setVideos(res.data);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  console.log(courses, "courses");

  // http://64.227.42.134:3030/api/videos?page=1
  return (
    <>
      <nav className="flex justify-between mb-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/dashboard">
              <Link
                href="/"
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
                Videos
              </a>
            </div>
          </li>
        </ol>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setcreateVideoModal(true)}
        >
          Create Video
        </button>
      </nav>

      <div className="flex justify-between mb-3" aria-label="Breadcrumb">
        <div className="flex items-center  justify-center gap-3  my-2 md:justify-between  p-2 sm:flex-nowrap flex-wrap  w-[100%] bg-white dark:bg-[#111827] rounded-xl shadow-lg hover:shadow-xl transform  transition duration-500">
          <div className="flex bg-gray-100 dark:bg-[#374151] gap-x-4 p-2 w-[100%] sm:w-[50%] space-x-4 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 opacity-30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className="bg-gray-100 outline-none dark:bg-[#374151] w-[100%]"
              type="search"
              placeholder="Search ..."
            />
          </div>

          <div className="flex items-center gap-x-3 ">
            <select
              id="courseId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              ref={courseModulIdRef}
              onChange={moduleChangeFunc}
            >
              <option selected>Choose a course module</option>
              {courses?.map((el: any, inx: any) => {
                return (
                  <option value={inx} key={inx}>
                    {" "}
                    {el?.name}{" "}
                  </option>
                );
              })}
            </select>

            <select
              id="courseId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
              ref={courseModulIdRef}
            >
              <option selected>Choose a page </option>

              {totalPages?.map((el: any, inx: any) => {
                return (
                  <option value={inx + 1} key={inx}>
                    {" "}
                    {inx + 1}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {videos.length ? (
          videos.map((el: any) => {
            return (
              <div
                className=" bg-white dark:bg-[#111827] shadow-lg rounded-lg overflow-hidden my-4"
                key={el?.id}
              >
                <ReactPlayer
                  url={el?.videoPath}
                  controls
                  className="w-full h-56 object-cover object-center"
                />

                <div className="py-4 px-6">
                  <h1 className="text-2xl font-semibold text-gray-600">
                    {el?.name}
                  </h1>

                  <div className="flex items-center mt-4 text-gray-600">
                    <GiSandsOfTime size="25" />
                    <h1 className="px-2 text-sm">
                      {" "}
                      Video davomiyligi: {el.length}{" "}
                    </h1>
                  </div>
                </div>
                <div className="flex items-center  justify-center gap-x-3 pb-3">
                  <button
                    className="bg-[orange] rounded-lg p-2 "
                    onClick={() => {
                      GetOne(el?.id);
                    }}
                  >
                    <AiOutlineEdit color={"white"} size={30} />
                  </button>
                  <button className="bg-[red] rounded-lg p-2 ">
                    <BsTrash color={"white"} size={30} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex w-ful items-center lg:justify-between  justify-center lg:flex-nowrap flex-wrap gap-x-3 ">
            {" "}
            <VideoSkeleton /> <VideoSkeleton /> <VideoSkeleton />{" "}
          </div>
        )}
      </div>

      {/* create modal  */}

      <Modal
        width={"500px"}
        title={"Create Videos"}
        modal={createVideoModal}
        setModal={setcreateVideoModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={createVideoFunc}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent"
                placeholder="Video name"
                type="text"
                ref={videoNameRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Video path</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent "
                placeholder="Video path"
                type="text"
                ref={videoPathRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Video langth</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent  "
                placeholder="Video langth"
                type="text"
                ref={videoLengthRef}
              />
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <label
                htmlFor="courseId"
                className="block  text-sm font-medium text-gray-900 dark:text-white"
              >
                Course Module
              </label>
              <select
                id="courseId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                ref={courseModulIdRef}
              >
                <option selected>Choose a module</option>
                <option value="US">United States</option>
              </select>
            </div>

            <div className="flex gap-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Add
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={() => setcreateVideoModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* edit modal  */}

      <Modal
        width={"480px"}
        title={"Edit"}
        modal={videoModal}
        setModal={setVideoModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            // onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent"
                placeholder="Video name"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Video path</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent "
                placeholder="Video path"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Video langth</label>
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none  focus:border-gray-700  bg-transparent  "
                placeholder="Video langth"
                type="text"
              />
            </div>

            <div className="flex gap-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setVideoModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
