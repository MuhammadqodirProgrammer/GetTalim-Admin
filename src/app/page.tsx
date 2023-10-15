"use client"

import FamousCourses from "@/components/FamousCourses/FamousCourses";
import NewCourses from "@/components/NewCourses/NewCourses";
import { SkeletonDemo } from "@/components/Skeleton/Skeleton";
import Skeleton from "@/components/ui/skeleton";
export default function Home() {
  const token:any =localStorage.getItem("token")
  return (
    <>
{
  token && (<main className="w-full md:container mx-auto md:px-5">
  <div className="flex flex-wrap gap-5">
    <SkeletonDemo />
    <SkeletonDemo />
    <SkeletonDemo />
  </div>
</main>)

}
    </>


   
  );
}
