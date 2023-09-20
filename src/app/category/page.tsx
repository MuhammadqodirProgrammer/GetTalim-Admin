"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsCalendarCheck, BsCalendarDay, BsTrash } from "react-icons/bs";
import instance from "../api/api";

export default function Category() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCategory = async () => {
      let response = await instance.get("/api/categories?page=1", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    };
    getCategory();
  }, []);
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
                Suniy intlekt
              </a>
            </div>
          </li>
        </ol>
      </nav>
      {data.map((el: any) => {
        return (
          <>
            <div className="card flex border bg-gray-100 mb-3 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex-auto p-3">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {el.name}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {el.description}
                </p>
                <div className="w-44">
                  <a
                    href="#"
                    className="inline-flex text-gray-700 w-full items-center justify-center mt-1 text-l font-medium   rounded   hover:text-gray-900 bg-gray-200 dark:text-gray-200 dark:bg-gray-600 hover:bg-gray-300 px-3 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <span className="w-full">Course</span>
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
                  </a>
                </div>
                <div className="flex flex-wrap items-center mt-2 mb-2">
                  <p className="me-5 mx-1 font-normal bold text-gray-700 dark:text-gray-400">
                    {el.createdAt}
                  </p>
                  <p className="mx-1 font-normal bold text-gray-700 dark:text-gray-400">
                    {el.updatedAt}
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <BsCalendarDay color={"white"} size={16} />
                    <p className=" dark:text-gray-400">31.08.2023 4:17 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <BsCalendarCheck color={"white"} size={16} />
                    <p className=" dark:text-gray-400">04.09.2023 10:59 AM</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 mt-3 gap-3">
                <button className="bg-[orange] rounded-lg p-2 ">
                  <AiOutlineEdit color={"white"} size={30} />
                </button>
                <button className="bg-[red] rounded-lg p-2">
                  <BsTrash color={"white"} size={30} />
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
