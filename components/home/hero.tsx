import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { Search } from "lucide-react";

function Hero() {
  return (
    <div className="flex items-center justify-between">
      {/* Right */}
      <div className="flex flex-col gap-y-2 w-2/3">
        <div className="flex gap-x-1.5">
          <div className="flex items-start">
            <Image src={logo} alt="logo" width={60} height={60} />
          </div>
          <div className="flex flex-col gap-y-2 relative">
            <h1 className="text-4xl font-bold">جعبه ابزار</h1>
            <p>خوش برگشتی! هر ابزاری که نیازی داری اینجاست✨</p>
            {/* star shape */}
            <div className="absolute bottom-8 left-20 opacity-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
                  stroke="#6f4da4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="#6f4da4"
                />
              </svg>
            </div>
            <div className="absolute -top-2 left-30 opacity-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10px"
                height="10px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
                  stroke="#6f4da4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="#6f4da4"
                />
              </svg>
            </div>
            <div className="absolute -top-3 right-0 opacity-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15px"
                height="15px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L13.4302 8.31181C13.6047 8.96 13.692 9.28409 13.8642 9.54905C14.0166 9.78349 14.2165 9.98336 14.451 10.1358C14.7159 10.308 15.04 10.3953 15.6882 10.5698L21 12L15.6882 13.4302C15.04 13.6047 14.7159 13.692 14.451 13.8642C14.2165 14.0166 14.0166 14.2165 13.8642 14.451C13.692 14.7159 13.6047 15.04 13.4302 15.6882L12 21L10.5698 15.6882C10.3953 15.04 10.308 14.7159 10.1358 14.451C9.98336 14.2165 9.78349 14.0166 9.54905 13.8642C9.28409 13.692 8.96 13.6047 8.31181 13.4302L3 12L8.31181 10.5698C8.96 10.3953 9.28409 10.308 9.54905 10.1358C9.78349 9.98336 9.98336 9.78349 10.1358 9.54905C10.308 9.28409 10.3953 8.96 10.5698 8.31181L12 3Z"
                  stroke="#6f4da4"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="#6f4da4"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <div
            className="
      w-11/12 p-2 py-2
      rounded-xl gap-x-2
      flex items-center justify-between
      isolate
      bg-white/20 dark:bg-neutral-900/30
      shadow-lg
      ring-1 ring-black/5 dark:ring-white/10
      backdrop-blur-lg
      transition-all duration-200
      hover:bg-white/30 dark:hover:bg-black/40
      focus-within:ring-2 focus-within:ring-purple-500/60
    "
          >
            {/* Icon */}
            <div className="flex items-center justify-center text-gray-600 dark:text-gray-300">
              <Search />
            </div>

            {/* Input */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="جستجو ابزار مورد نظر..."
                className="
          w-full
          bg-transparent
          border-none
          outline-none
          text-gray-800 dark:text-gray-100
          placeholder:text-gray-500 dark:placeholder:text-gray-400
        "
              />
            </div>
          </div>
        </div>
      </div>
      {/* Left */}
    </div>
  );
}

export default Hero;
