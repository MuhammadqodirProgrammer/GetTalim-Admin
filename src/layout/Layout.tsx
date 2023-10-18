"use client";
import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import FamousCourses from "@/components/FamousCourses/FamousCourses";
import NewCourses from "@/components/NewCourses/NewCourses";
import { useRouter } from "next/navigation";

export default function Layout({ children }: any) {
  const token = localStorage.getItem("token");
  const router: any = useRouter();

  if (!token) {
    router.replace("/auth");
  } else {
    // router.replace("/");
  }

  if (token) {
    return (
      <div>
        <div>
          <Header />
        </div>
        <Navbar />
        <div className="inner_container pb-[100px] mt-[12vh] ">{children}</div>
        <div>
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="  ">{children}</div>
      </div>
    );
  }
}
