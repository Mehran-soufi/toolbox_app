import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "جعبه ابزار",
    short_name: "جعبه ابزار",
    description:
      "مجموعه‌ای از ابزارهای آنلاین رایگان و کاربردی برای نیازهای روزمره",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#ad46ff",
    orientation: "portrait",
    lang: "fa",
    dir: "rtl",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}