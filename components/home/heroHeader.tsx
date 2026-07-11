import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import FloatingStar from "../shared/floatingStar";

function HeroHeader() {
  return (
    <>
      <div className="flex gap-x-1.5">
        <div className="flex items-start">
          <Image src={logo} alt="logo" width={60} height={60} />
        </div>
        <div className="flex flex-col gap-y-2 relative">
          <h1 className="text-4xl font-bold">جعبه ابزار</h1>
          <p>خوش برگشتی! هر ابزاری که نیازی داری اینجاست✨</p>
          {/* star shape */}
          <FloatingStar size={25} className="bottom-8 left-20" opacity={0.8} />
          <FloatingStar size={10} className="-top-2 left-30" opacity={0.4} />
          <FloatingStar size={15} className="-top-3 right-0" opacity={0.6} />
        </div>
      </div>
    </>
  );
}

export default HeroHeader;
