import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface AppBreadcrumbProps {
  items: BreadcrumbItem[];
}

function AppBreadcrumb({ items }: AppBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm">

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.title}
              className="flex items-center gap-2"
            >
              {isLast ? (
                <span className="font-semibold text-foreground">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href ?? "#"}
                  className="
                    text-muted-foreground
                    transition-colors
                    hover:text-purple-500
                  "
                >
                  {item.title}
                </Link>
              )}

              {!isLast && (
                <ChevronLeft
                  size={15}
                  className="text-muted-foreground/60"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default AppBreadcrumb;