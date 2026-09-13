import NavigationProgress from "@/components/shared/navigation-progress";
import AppSidebar from "@/components/shared/app-sidebar";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import BottomNav from "@/components/shared/bottom-nav";
import PageTransition from "@/components/shared/page-transition";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}