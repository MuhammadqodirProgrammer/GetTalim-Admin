"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/react-native.webp";

import React, { useEffect, useState } from "react";
import instance, { baseUrlImg } from "@/app/api/api";

const NewCourses = () => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const getCourse = async () => {
      let response = await instance.get("/api/courses?page=1", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    };

    getCourse();
  }, []);

  return (
    <div className="flex flex-wrap gap-5">
      {data.map((el: any) => {
        return (
          <>
            <Link
              href="/singleProduct"
              className="flex flex-col relative w-full lg:w-[31%] bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto"
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
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default NewCourses;
