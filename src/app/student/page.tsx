import Link from "next/link";
import demo from "../../../public/images/logo2.png";
import Image from "next/image";
import { BsCalendarDay } from "react-icons/bs";

export default function Student() {
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
      <h1 className="text-white text-[30px]">Students</h1>
      <div>
        <div></div>
        <div className="flex flex-wrap gap-3 md:justify-start justify-center">
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-cardColor flex flex-col justify-center items-center p-3 rounded-lg w-full sm:max-w-[200px]">
            <Image src={demo} width={100} height={100} alt="pic" />
            <div className="mt-2">
              <h4 className="text-white font-semibold text-[18px]">
                Nozim Hakimov Rustam
              </h4>
              <p className="text-[grey]">nozim@gmail.com</p>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">30.08.2023 12:43 PM</p>
              </div>
              <div className="flex gap-2 mt-2">
                <BsCalendarDay color={"white"} />
                <p className="text-[grey] text-[14px]">02.09.2023 1:22 AM</p>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <button className="p-2 rounded-md bg-[blue] text-white">
                  Edit
                </button>
                <button className="p-2 rounded-md bg-[red] text-white">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
