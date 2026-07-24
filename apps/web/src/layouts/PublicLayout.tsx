import { Outlet } from "react-router-dom";
import { NavBar } from "../features/public-site/components/NavBar";
import { Footer } from "../features/public-site/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "@/features/public-site/components/MobileNavbar";

export const PublicLayout = () => {

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <MobileNavbar />

        <main>
          <Outlet />
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );

}