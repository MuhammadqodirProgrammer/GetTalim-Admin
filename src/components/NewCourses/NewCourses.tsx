"use client";
import Link from "next/link";
import Image from "next/image";
import BgImage from "public/images/react-native.webp";

import React from "react";

const NewCourses = () => {
  return (
    <div className="flex flex-wrap gap-5">
      <Link
        href="/singleProduct"
        className="flex flex-col relative w-full lg:w-[31%] bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto"
      >
        <Image
          className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
          src={BgImage}
          alt="Picture of the course"
          width={"100%"}
          height={"100%"}
        />
        <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
          mobil dastur
        </h5>
        <h6 className="pt-3 pb-3 font-medium text-white text-center">
          React Native to'liq kurs
        </h6>
        <hr className="h-1 w-full bg-CoursesHr" />
        <div className="flex justify-between pt-5 items-center">
          <div className="flex gap-3 text-white items-center">
            <Link
              href="/singleProduct"
              className="text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover"
            >
              batafsil
            </Link>
          </div>
          <div className="flex gap-3 text-white items-center">
            <p className="text-sm line-through">250.000</p>
            <p className="font-bold">Bepul</p>
          </div>
        </div>
      </Link>
      <Link
        href="/singleProduct"
        className="flex flex-col relative bg-newCourcesBg w-full lg:w-[31%] shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5  max-lg:m-auto"
      >
        <Image
          className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
          src={BgImage}
          alt="Picture of the course"
          width={"100%"}
          height={"100%"}
        />
        <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
          mobil dastur
        </h5>
        <h6 className="pt-3 pb-3 font-medium text-white text-center">
          React Native to'liq kurs
        </h6>
        <hr className="h-1 w-full bg-CoursesHr" />
        <div className="flex justify-between pt-5 items-center">
          <div className="flex gap-3 text-white items-center">
            <Link
              href="/singleProduct"
              className="text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover"
            >
              batafsil
            </Link>
          </div>
          <div className="flex gap-3 text-white items-center">
            <p className="text-sm line-through">250.000</p>
            <p className="font-bold">Bepul</p>
          </div>
        </div>
      </Link>
      <Link
        href="/singleProduct"
        className="flex flex-col relative w-full lg:w-[31%] bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5  max-lg:m-auto"
      >
        <Image
          className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
          src={BgImage}
          alt="Picture of the course"
          width={"100%"}
          height={"100%"}
        />
        <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
          mobil dastur
        </h5>
        <h6 className="pt-3 pb-3 font-medium text-white text-center">
          React Native to'liq kurs
        </h6>
        <hr className="h-1 w-full bg-CoursesHr" />
        <div className="flex justify-between pt-5 items-center">
          <div className="flex gap-3 text-white items-center">
            <Link
              href="/singleProduct"
              className="text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover"
            >
              batafsil
            </Link>
          </div>
          <div className="flex gap-3 text-white items-center">
            <p className="text-sm line-through">250.000</p>
            <p className="font-bold">Bepul</p>
          </div>
        </div>
      </Link>
      <Link
        href="/singleProduct"
        className="flex flex-col relative w-full lg:w-[31%] bg-newCourcesBg shadow-[0_25px_50px_-12px_#00000040] rounded-md p-5 max-lg:m-auto"
      >
        <Image
          className="min-h-[250px] h-full w-full object-cover rounded-md transition ease-in-out hover:opacity-75"
          src={BgImage}
          alt="Picture of the course"
          width={"100%"}
          height={"100%"}
        />
        <h5 className="pt-2 text-sm text-newCourcesPreTitleColor text-center uppercase">
          mobil dastur
        </h5>
        <h6 className="pt-3 pb-3 font-medium text-white text-center">
          React Native to'liq kurs
        </h6>
        <hr className="h-1 w-full bg-CoursesHr" />
        <div className="flex justify-between pt-5 items-center">
          <div className="flex gap-3 text-white items-center">
            <Link
              href="/singleProduct"
              className="text-newCourcesBtn border border-solid border-newCourcesBtn font-medium px-3 py-1 rounded-md transition ease-in-out  hover:bg-newCourcesBtnHover"
            >
              batafsil
            </Link>
          </div>
          <div className="flex gap-3 text-white items-center">
            <p className="text-sm line-through">250.000</p>
            <p className="font-bold">Bepul</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NewCourses;
