import { Outlet } from "react-router-dom";
import { NavBar } from "../features/public-site/components/NavBar";
import { Footer } from "../features/public-site/components/Footer";

export const PublicLayout = () => {
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