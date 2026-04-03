import About from "./components/about";
import Experiences from "./components/experiences";
import Projects from "./components/projects/projects";
import PageClient from "./components/page-client";

export default function Home() {
  return (
    <PageClient>
      <About />
      <Experiences />
      <Projects />
    </PageClient>
  );
}
