"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import instance, { baseUrl } from "../api/api";
import Demo from "../../../public/images/logo2.png";
import Image from "next/image";

export default function Page() {
  const [data, setData] = useState();
  const [num, setNum] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/courserequirments`)
      .then((res) => res.json())
      .then((data) => {
        let set = data.map((el: any) => el.courseId);
        setNum(set);
        setData(data);
      });
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
      <div>
        <div className="border border-gray-500 p-3 max-w-[250px] rounded-md shadow-md">
          <Image src={Demo} width={100} height={100} alt="pic" />
          <p className="text-white">Nextjs organish</p>
        </div>
      </div>
    </div>
  );
}
