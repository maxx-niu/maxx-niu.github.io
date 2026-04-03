import About from "./components/about";
import Contact from "./components/contact";
import Experiences from "./components/experiences";
import Projects from "./components/projects/projects";
import PageClient from "./components/page-client";

export default function Home() {
  return (
    <PageClient>
      <About />
      <Experiences />
      <Projects />
      <Contact />
    </PageClient>
  );
}
