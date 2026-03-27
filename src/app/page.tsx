import Experiences from "./components/experiences";
import Landing from "./components/landing/landing";
import NavbarWrapper from "./components/navbar-wrapper";

export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <Landing />
      <Experiences />
    </>
  );
}
