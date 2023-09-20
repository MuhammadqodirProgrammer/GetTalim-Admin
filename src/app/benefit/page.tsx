"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance, { baseUrlImg } from "../api/api";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Benefits() {
  const [data, setData] = useState<any>([]);
  const [requirement, setRequirement] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const getCourseRequirement = async () => {
      let response = await instance.get("/api/coursebenefits?page=1", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRequirement(response.data);
      let id = await response.data.map((el: any) => el.courseId);
      setId(id);
    };
    getCourseRequirement();

    const getCourse = async () => {
      let response = await instance.get(`/api/courses/1`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res: any = [response.data];
      setData(res);
      let id = res.map((el: any) => el.id);
      setId(id);
    };
    getCourse();
  }, []);

  return (
    <div className="">
      <h1 className="text-textColor text-[30px]"> Course Benefits</h1>
      <div className="flex flex-wrap">
        {data.map((el: any) => {
          return (
            <div
              className="flex flex-col relative w-full lg:w-[31%] bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto 
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
                <h6 className="pt-3 pb-3 font-medium text-white text-center">
                  {el.name}
                </h6>
                <hr className="h-1 w-full bg-CoursesHr" />
                <div className="flex justify-between pt-5 items-center">
                  <div className="flex gap-3 text-white items-center">
                    <button className="text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover">
                      batafsil
                    </button>
                  </div>
                  <div className="flex gap-3 text-white items-center">
                    <p className="text-sm line-through">{el.price}</p>
                    <p className="font-bold">Bepul</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-[25px] text-white mt-5 ">
                    Course all Benefits
                  </h2>
                  {requirement.map((el: any) => {
                    return (
                      <div className="">
                        <h4 className="text-white">{el.name}</h4>
                      </div>
                    );
                  })}
                </div>
              </Link>
              <div className="mt-3 flex items-center gap-3">
                <button className="text-white flex items-center gap-2 bg-[orange] p-2 rounded-md">
                  <FiEdit2 /> Edit
                </button>
                <button className="text-white flex items-center gap-2 bg-[red] p-2 rounded-md">
                  <FiTrash2 /> delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}