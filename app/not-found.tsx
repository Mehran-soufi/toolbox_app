"use client";

import Image from "next/image";
import notFoundImg from "@/assets/notfound/notfound.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full lg:h-screen h-[70vh]">
      <div className="w-full h-full flex flex-col gap-y-5 items-center justify-center">
        <div className="relative xl:w-200 lg:w-145 md:w-110 w-70 xl:h-65 lg:h-55 md:h-40 h-20">
          <Image fill src={notFoundImg} alt="صفحه پیدا نشد!" />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <p className="text-base md:text-xl xl:text-2xl">متاسفانه صفحه موردنظر پیدا نشد!</p>
          <Link href="/" >
            <Button variant={"outline"} size="lg" className="w-full text-sm md:text-base xl:text-lg">
              بازگشت به صفحه نخست
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
