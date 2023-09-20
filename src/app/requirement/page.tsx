"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance, { baseUrl, baseUrlImg } from "../api/api";
import Demo from "../../../public/images/logo2.png";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Page() {
  const [data, setData] = useState<any>([]);
  const [requirement, setRequirement] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const getCourseRequirement = async () => {
      let response = await instance.get("/api/courserequirments?page=1", {
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

  const handleSubmit = async (evt: any) => {
    evt.preventDefault();
    console.log(evt.target[0].value);
    console.log(evt.target[1].value);
    let data = {
      Requirment: evt.target[0].value,
      CourseId: evt.target[1].value,
    };
    let response = await instance.post("/api/courserequirments", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
  };
  return (
    <div className="">
      <h1 className="text-textColor text-[30px]"> Course Requirements</h1>
      <div>
        <form className="flex gap-5" onSubmit={(evt) => handleSubmit(evt)}>
          <input
            className="p-2 outline-none rounded-md"
            type="text"
            name="requirement"
          />
          <input
            className="p-2 outline-none rounded-md"
            type="number"
            name="CourseId"
          />
          <button type="submit" className="bg-[blue] p-3 text-white rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="flex flex-wrap gap-5">
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
                  <h2 className="mt-4 text-white text-[25px]">
                    All Requirements:
                  </h2>
                  {requirement.map((el: any) => {
                    return (
                      <div>
                        <h4 className="text-white">{el.requirment}</h4>
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
