// components/shared/popular-tools-section.tsx
import { popularTools } from "@/lib/popular-tools";
import PopularToolCard from "./popular-tool-card";

function PopularToolsSection() {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">ابزارهای محبوب</h2>
        <button className="text-sm text-purple-500">مشاهده همه</button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {popularTools.map((tool) => (
          <PopularToolCard key={tool.id} {...tool} />
        ))}
      </div>
    </section>
  );
}

export default PopularToolsSection;