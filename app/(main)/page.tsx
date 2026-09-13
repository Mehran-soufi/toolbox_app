
import Hero from "@/components/home/hero";
import HomPrice from "@/components/home/hom-price";
import MainTools from "@/components/home/mainTools";
import PopularToolsSection from "@/components/shared/popular-tools-section";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <Hero />
      <MainTools/>
      <HomPrice/>
      <PopularToolsSection/>
    </div>
  );
}
