"use client";
import NewCourses from "@/components/NewCourses/NewCourses";
import Image from "next/image";
import Link from "next/link";
import BgImage from "public/images/react-native.webp";
import instance, { baseUrlImg } from "../api/api";
import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Comment() {
  const [data, setData] = useState<any>([]);
  const [comment, setComment] = useState([]);
  const [id, setId] = useState([]);

  const getCourseComment = async () => {
    let response = await instance.get("/api/course-comments?page=1", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setComment(response.data);
    let id = await response.data.map((el: any) => el.courseId);
    setId(id);
  };

  const getCourse = async () => {
    let res1: any = id.forEach((element) => {
      console.log(element);
    });
    // console.log(res1);

    let response = await instance.get(`/api/courses/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res: any = response.data;
    setData(res);
  };
  useEffect(() => {
    getCourseComment();
    getCourse();
  }, []);

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    const newData = new FormData();
    newData.append("Comment", evt.target[0].value);
    newData.append("CourseId", evt.target[1].value);
    console.log(newData);

    let response = await instance.post("/api/coursecomments", newData);
    console.log(response);

    if (response.status === 200) {
      alert("Created Comment Course");
      getCourseComment();
    }
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
      <h1 className="text-[black] dark:text-white text-[30px]">
        Course Comment{" "}
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex mt-5 flex-col gap-3 w-[50%]"
        >
          <input type="text" className="p-3 rounded-md" placeholder="Name" />
          <select className="p-2 rounded-md">
            <option value="1">1</option>
          </select>
          <button className="bg-[blue] w-[95px] text-white p-3 rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-wrap gap-5">
        {comment.map((i: any) => {
          return (
            <>
              {data.map((el: any) => {
                return (
                  <div
                    className="flex flex-col relative w-full lg:w-[31%] bg-[#eee] dark:bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto border border-[#ddd] dark:border-none
          "
                  >
                    <Link
                      href="/singleProduct"
                      className=" flex flex-col relative  max-lg:m-auto  "
                    >
                      <Image
                        className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
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
                          <button className="text-slate-700 dark:text-newCourcesBtn border border-solid border-[purple] dark:border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover">
                            batafsil
                          </button>
                        </div>
                        <div className="flex gap-3 text-[black] dark:text-white items-center">
                          <p className="text-sm line-through">{el.price}</p>
                          <p className="font-bold">Bepul</p>
                        </div>
                      </div>
                      <div>
                        <div className="mt-4">
                          <h4 className="text-[black] dark:text-white">
                            {i.comment}
                          </h4>
                        </div>
                      </div>
                    </Link>
                    <div className="mt-3 flex items-center gap-3">
                      <button className="text-white flex items-center gap-2 bg-[orange] p-2 rounded-md">
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => deleteComment(i.id)}
                        className="text-white flex items-center gap-2 bg-[red] p-2 rounded-md"
                      >
                        <FiTrash2 /> delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
