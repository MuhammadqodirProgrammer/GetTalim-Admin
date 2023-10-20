"use client";
import Link from "next/link";
import { FaUserTie } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { MdCalendarMonth } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

import Image from "../../../node_modules/next/image";
import ReactPlayer from "react-player";
import { AiOutlineEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { GiSandsOfTime } from "react-icons/gi";
import { Modal } from "@/components/Modal/Modal";
import { useEffect, useRef, useState } from "react";
import instance, { baseUrlImg } from "../api/api";
import { VideoSkeleton } from "@/components/Skeleton/Skeleton";
import { Pagination } from "@/components/Pagination/Pagination";
import { ErrorModal } from "@/components/ErrorModal/ErrorModal";

export default function Resources() {
  // mentor states
  const [mentor, setMentor] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [mentorID, setMentorID] = useState<any>();
  const [deleteID, setDeleteID] = useState<any>();
  const [createMentor, setCreateMentor] = useState(false);
  const [editMentor, setEditMentor] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [mentors, setMentors] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>([]);
  const [oneData, setOneData] = useState<any>({});
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  //  crate refs
  const firstNameRef: any = useRef<HTMLInputElement>();
  const lastNameRef: any = useRef<HTMLInputElement>();
  const imgRef: any = useRef<HTMLInputElement>();
  const descriptionRef: any = useRef<HTMLInputElement>();
  const emailRef: any = useRef<HTMLInputElement>();
  const stackRef: any = useRef<HTMLInputElement>();

  //  edutr refs
  const editfirstNameRef: any = useRef<HTMLInputElement>();
  const editlastNameRef: any = useRef<HTMLInputElement>();
  const editimgRef: any = useRef<HTMLInputElement>();
  const editdescriptionRef: any = useRef<HTMLInputElement>();
  const editemailRef: any = useRef<HTMLInputElement>();
  const editstackRef: any = useRef<HTMLInputElement>();
  // my toasts
  const createNotifcation = () => toast.success("Successfully Created Mentor");
  const createErrorNotifcation = () =>
    toast.error("Error While Creating Mentor");
  const editNotifcation = () => toast.success("Successfully Edited Mentor");
  const deleteNotifcation = () => toast.success("Successfully Deleted Mentor");
  const editErrorNotifcation = () => toast.error("Error While Editing Mentor");
  const deleteErrorNotifcation = () =>
    toast.error("Error While Deleting Mentor");

  // get mentors
  const getMentors = async () => {
    const response = await instance.get(`api/mentors?page=1`);

    if (response?.status == 200) {
      setMentors(response?.data);

      //  setTotalPages()
    } else if (response?.data.unauthorized) {
      setUnauthorized(true);
    }
  };
  // create func
  const createMentorFunc = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstName", firstNameRef?.current?.value);
    formData.append("lastName", lastNameRef?.current?.value);
    formData.append("image", imgRef?.current?.files[0]);
    formData.append("description", descriptionRef?.current?.value);
    formData.append("email", emailRef?.current?.value);
    formData.append("stack", stackRef?.current?.value);

    let response = await instance.post(`api/mentors`, formData);

    if (response?.status == 200) {
      setCreateMentor(false);
      getMentors();
      createNotifcation();
    } else if (response?.data.unauthorized) {
      setUnauthorized(true);
    } else {
      createErrorNotifcation();
    }
  };

  // edit func
  const editMentorFunc = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "firstName",
      editfirstNameRef?.current?.value || oneData?.firstName
    );
    formData.append(
      "lastName",
      editlastNameRef?.current?.value || oneData?.lastName
    );
    formData.append(
      "image",
      editimgRef?.current?.files[0] || oneData?.imagePath
    );
    formData.append(
      "description",
      editdescriptionRef?.current?.value || oneData?.description
    );
    formData.append("email", editemailRef?.current?.value || oneData?.email);
    formData.append("stack", editstackRef?.current?.value || oneData?.stack);

    let response = await instance.put(`api/mentors/${oneData?.id}`, formData);

    if (response?.status == 200) {
      setEditMentor(false);
      getMentors();
      editNotifcation();
    } else if (response?.data.unauthorized) {
      setUnauthorized(true);
    } else {
      editErrorNotifcation();
    }
  };

  // delete function
  async function deleteFunc(evt: any) {
    evt.preventDefault();

    const response = await instance.delete(`api/mentors/${deleteID}`);

    if (response?.status == 200) {
      getMentors();
      setdeleteModal(false);
      deleteNotifcation();
    } else if (response?.data.unauthorized) {
      setUnauthorized(true);
    } else {
      deleteErrorNotifcation();
    }
  }

  useEffect(() => {
    getMentors();
  }, []);

  async function GetOne(id: any) {
    const res = await instance.get(`api/mentors/${id}`);
    setEditMentor(true);

    if (res?.status == 200) {
      setOneData(res?.data);
    }
  }

  return (
    <>
      {/* mentor page */}
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
                Mentors
              </a>
            </div>
          </li>
        </ol>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCreateMentor(true)}
        >
          Create Mentor
        </button>
      </nav>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {mentors.length ? (
          mentors.map((el: any): any => (
            <div
              className="p-4 border border-gray-300 shadow-lg bg-[#eee] rounded-lg dark:border-gray-700 dark:bg-gray-800"
              key={el?.id}
            >
              <div className="flex flex-col items-center md:flex-row md:max-w-xl">
                <Image
                  width={100}
                  height={100}
                  className="image-square p-2 rounded-full object-cover h-[120px] w-[120px]"
                  src={`${baseUrlImg}/${el?.imagePath}`}
                  alt="img"
                />

                <div className="flex flex-col justify-between ml-3 leading-normal">
                  <h5 className="ml-1 text-2xl font-bold tracking-tight text-black dark:text-white">
                    {el?.firstName} {el?.lastName}
                  </h5>
                  <span className="ml-1 font-normal bold text-gray-700 dark:text-gray-400">
                    {el?.email}
                  </span>
                  <div className="flex items-center font-normal text-gray-700 dark:text-gray-400">
                    <span className="text-[#9F7AEA]">
                      <AiFillStar size={20} />
                    </span>{" "}
                    <span className="mr-2">4.8 Rate </span>
                    <span className="text-[#9F7AEA]">
                      <FaUserTie size="20" />
                    </span>{" "}
                    <span className="mr-2"> +1000 students</span>
                    <span className="text-[#9F7AEA]">
                      <AiFillPlayCircle size="20" />
                    </span>{" "}
                    <span className="mr-2"> +13 Courses</span>
                  </div>
                  <div className="flex ml-1 items-center mt-2">
                    <span className="text-black dark:text-white">
                      <MdCalendarMonth size="20" />
                    </span>
                    <p className="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
                      30.08.2023
                    </p>
                    <svg
                      className="w-4 h-4 text-black dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                      <path d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                    </svg>
                    <p className="mx-1 font-normal bold text-gray-700 dark:text-gray-400">
                      02.09.2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#ccc] dark:bg-[#374151] mt-2 ">
                <span
                  className="font-normal"
                  style={{ color: "rgb(128, 90, 213)" }}
                >
                  {el?.firstName} {el?.lastName} -{" "}
                </span>
                <span className="mb-1 font-normal text-gray-500 dark:text-gray-400">
                  {el?.description}
                </span>
              </div>
              <div className="mt-3 p-1 pl-2 overflow-x-auto h-20 rounded-lg bg-[#ccc] dark:bg-[#374151]">
                <span
                  className="font-normal"
                  style={{ color: "rgb(128, 90, 213)" }}
                >
                  Stack -{" "}
                </span>
                <span className="mb-1 font-normal text-gray-500 dark:text-gray-400">
                  {el?.stack}
                </span>
              </div>
              <div className="flex mt-1">
                <button
                  className="mt-2 w-full justify-center text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-blue-500"
                  onClick={() => GetOne(el?.id)}
                >
                  Yangilash
                </button>

                <button type="button" className="w-full" />

                <button
                  className="mt-2 w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-red-600 dark:hover-bg-red-700 dark:focus-ring-red-800"
                  onClick={() => {
                    setdeleteModal(true);
                    setDeleteID(el?.id);
                  }}
                >
                  O&apos;chirish
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-ful items-center lg:justify-between  justify-center lg:flex-nowrap flex-wrap gap-x-3 ">
            {" "}
            <VideoSkeleton /> <VideoSkeleton /> <VideoSkeleton />{" "}
          </div>
        )}
      </div>

      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={2}
        // totalPage={totalPage}
      />

      {/* create modal  */}

      <Modal
        width={"900px"}
        title={"Create Mentor"}
        modal={createMentor}
        setModal={setCreateMentor}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={createMentorFunc}
          >
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent "
                placeholder="Mentor firstName"
                type="text"
                ref={firstNameRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
                placeholder="Mentor lastName"
                type="text"
                ref={lastNameRef}
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
                placeholder="Mentor email"
                type="text"
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 "
                placeholder="Mentor Stack"
                type="text"
                ref={stackRef}
              />
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="flex flex-col gap-2">
                <textarea
                  ref={descriptionRef}
                  id="message"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  outline-none dark:focus:border-blue-500"
                  placeholder="Description..."
                  defaultValue={""}
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[95px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-4">
                    <svg
                      className="w-8 h-6 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> img
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    ref={imgRef}
                  />
                </label>
              </div>
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
                onClick={() => setCreateMentor(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* edit modal  */}

      <Modal
        width={"900px"}
        title={"Edit Mentor"}
        modal={editMentor}
        setModal={setEditMentor}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={editMentorFunc}
          >
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent "
                placeholder="Edit Mentor firstName"
                type="text"
                defaultValue={oneData?.firstName}
                ref={editfirstNameRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
                placeholder="Edit Mentor lastName"
                type="text"
                defaultValue={oneData?.lastName}
                ref={editlastNameRef}
              />
            </div>

            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none   dark:focus:border-blue-500  focus:border-blue-500  dark:bg-gray-700 bg-transparent  "
                placeholder="Edit  Mentor email"
                type="text"
                defaultValue={oneData?.email}
                ref={editemailRef}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="w-full p-2 border rounded  border-gray-500 outline-none    dark:bg-gray-700 bg-transparent  dark:focus:border-blue-500  focus:border-blue-500 "
                placeholder="Edit Mentor Stack"
                type="text"
                defaultValue={oneData?.stack}
                ref={editstackRef}
              />
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="flex flex-col gap-2">
                <textarea
                  ref={editdescriptionRef}
                  id="message"
                  rows={3}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500  outline-none dark:focus:border-blue-500"
                  placeholder="Edit Description..."
                  defaultValue={oneData?.description}
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file-mentor"
                  className=" relative flex flex-col items-center justify-center w-full h-[95px] border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-3 pb-4">
                    {oneData?.imagePath ? (
                      <Image
                        width={100}
                        height={100}
                        className="w-[100%] object-cover h-[90px] rounded-lg absolute left-0 top-0 mb-4 text-gray-500 dark:text-gray-400"
                        src={`${baseUrlImg}/${oneData?.imagePath}`}
                        alt="img"
                      />
                    ) : (
                      <svg
                        className="w-8 h-6 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    )}

                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> and
                      edit img
                    </p>
                  </div>
                  <input
                    id="dropzone-file-mentor"
                    type="file"
                    className="hidden"
                    ref={editimgRef}
                  />
                </label>
              </div>
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
        width={"480px"}
        title={"Teacher"}
        modal={deleteModal}
        setModal={setdeleteModal}
      >
        <div className=" md:p-5 ">
          <form
            className="flex flex-col items-center gap-3 justify-center"
            onSubmit={deleteFunc}
          >
            <h2 className="mb-2 text-[22px] text-gray-500 dark:text-gray-400">
              {" "}
              Do you want to delete this mentor?{" "}
            </h2>
            <div className="flex gap-x-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Yes
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
    </>
  );
}
