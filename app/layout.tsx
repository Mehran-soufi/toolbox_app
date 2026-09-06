import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "./provider/theme-provider";
import "./globals.css";
import NavigationProgress from "@/components/shared/navigation-progress";
import AppSidebar from "@/components/shared/app-sidebar";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BottomNav from "@/components/shared/bottom-nav";
import PageTransition from "@/components/shared/page-transition";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/layout/scroll-to-top";

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
  metadataBase: new URL("https://tlbbox-app.vercel.app"),

  title: {
    default: "جعبه ابزار | ابزارهای آنلاین کاربردی",
    template: "%s | جعبه ابزار",
  },

  description:
    "جعبه ابزار مجموعه‌ای از ابزارهای آنلاین رایگان و کاربردی برای محاسبه، تبدیل، زمان، تاریخ، آب‌وهوا، قیمت‌ها، متن، QR کد و سایر نیازهای روزمره.",

  keywords: [
    "جعبه ابزار",
    "ابزار آنلاین",
    "ابزارهای آنلاین",
    "ابزار کاربردی",
    "ابزار رایگان",
    "ماشین حساب آنلاین",
    "تبدیل واحد",
    "محاسبه درصد",
    "محاسبه سن",
    "محاسبه تاریخ",
    "تقویم آنلاین",
    "تایمر آنلاین",
    "کرنومتر آنلاین",
    "آب و هوا",
    "قیمت طلا",
    "قیمت ارز",
    "ساخت QR کد",
    "تبدیل تصویر",
    "ویرایش متن",
  ],

  authors: [
    {
      name: "Mehran Soufi",
      url: "https://github.com/Mehran-soufi",
    },
  ],

  creator: "Mehran Soufi",
  publisher: "جعبه ابزار",
  applicationName: "جعبه ابزار",
  category: "Utilities",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: "جعبه ابزار",
    title: "جعبه ابزار | ابزارهای آنلاین کاربردی",
    description:
      "مجموعه‌ای از ابزارهای آنلاین رایگان و کاربردی برای محاسبه، تبدیل، زمان، تاریخ، آب‌وهوا، قیمت‌ها، متن و موارد دیگر.",
  },

  twitter: {
    card: "summary_large_image",
    title: "جعبه ابزار | ابزارهای آنلاین کاربردی",
    description:
      "مجموعه‌ای از ابزارهای آنلاین رایگان و کاربردی برای نیازهای روزمره.",
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
        <ScrollToTop />
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
            <div className="w-full flex-1 flex flex-col gap-y-2 min-h-screen">
              <div className="w-11/12 mx-auto flex-1 md:pb-0 flex flex-col gap-y-2">
                <Header />
                <NavigationProgress />
                <PageTransition>{children}</PageTransition>
                <Toaster position="top-center" richColors />
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
