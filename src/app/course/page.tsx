import NewCourses from "@/components/NewCourses/NewCourses";
import Link from "next/link";

export default function Courses() {
  return (
      <div className='container px-4 mx-auto '>
				<h2 className='text-[30px]  lg:text-[36px] my-5  text-white font-semibold pt-8 '>
					<span className='text-mainColor'>Barcha </span> kurslar
				</h2>
				<NewCourses />
			</div>
  );
}
