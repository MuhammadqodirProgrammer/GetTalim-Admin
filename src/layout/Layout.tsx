import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import FamousCourses from "@/components/FamousCourses/FamousCourses";
import NewCourses from "@/components/NewCourses/NewCourses";

export default function Layout({ children }: any) {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Navbar/>
      <div className="inner_container mt-[12vh] ">
        {children}
    
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
