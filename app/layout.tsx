import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./provider/theme-provider";
import "./globals.css";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BottomNav from "@/components/shared/bottom-nav";

export const vazirmatn = localFont({
  src: [
    {
      path: "./font/Vazirmatn-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./font/Vazirmatn-Black.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: {
    default: "جعبه ابزار",
    template: "%s | جعبه ابزار",
  },

  description:
    "جعبه ابزار؛ مجموعه‌ای از ابزارهای آنلاین کاربردی شامل ماشین حساب، ساعت جهانی، تایمر، کرنومتر، تبدیل واحد، قیمت ارز و طلا، آب‌وهوا و ده‌ها ابزار مفید دیگر.",

  keywords: [
    "جعبه ابزار",
    "ابزار آنلاین",
    "ماشین حساب",
    "تایمر",
    "کرنومتر",
    "ساعت جهانی",
    "تاریخ شمسی",
    "تقویم",
    "قیمت ارز",
    "قیمت طلا",
    "تبدیل واحد",
    "آب و هوا",
    "ابزارهای کاربردی",
    "Online Tools",
    "Toolbox",
  ],

  authors: [
    {
      name: "Mehran Soufi",
      url: "https://github.com/Mehran-soufi",
    },
  ],

  creator: "Mehran Soufi",
  publisher: "Toolbox",

  applicationName: "Toolbox",

  category: "Utilities",

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="max-w-full min-h-screen bg-background text-foreground">
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Top Left Glow */}
          <div
            className="glow-primary
      absolute
      -top-56
      -left-56
      h-162.5
      w-162.5
      rounded-full

      bg-violet-600/20
      dark:bg-violet-500/25

      blur-[160px]
      "
          />

          {/* Bottom Right Glow */}
          <div
            className="glow-secondary
      absolute
      -bottom-62.5
      -right-62.5
      h-150
      w-150
      rounded-full

      bg-fuchsia-500/10
      dark:bg-fuchsia-600/15

      blur-[170px]
      "
          />

          {/* Very low noise*/}
          <div
            className="
    absolute
    inset-0

    opacity-[0.025]

    bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]
    bg-size-[48px_48px]
  "
          />
        </div>
        <ThemeProvider>
          <div className="flex">
            <AppSidebar />
            <div className="w-full flex-1 flex flex-col min-h-screen">
              <div className="w-11/12 mx-auto flex-1 md:pb-0">
                <Header />
                {children}
                <Footer />
              </div>
            </div>
          </div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
