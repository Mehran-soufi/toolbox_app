import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./provider/theme-provider";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/shared/app-sidebar";
import Footer from "@/components/layout/footer";

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
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            <main className="w-full flex flex-col justify-center items-center">
              <div className="w-11/12">
                {children}
                <Footer />
              </div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
