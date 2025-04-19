import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Education from "@/components/sections/education";
import Certificates from "@/components/sections/certificates";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Achievements from "@/components/sections/achievements";
import ButtonGradient from "@/components/svg/button-gradient";
import { cn } from "@/lib/utils";
import ScrollProgress from "@/components/effects/scroll-progress";
import AchievementNotification from "@/components/effects/achievement-notification";
import EasterEgg from "@/components/effects/easter-egg";

export default function Home() {
  return (
    <main>
      <div className={cn("overflow-hidden pt-[4.75rem] lg:pt-[5.25rem]")}>
        {/* Interactive UI Elements */}
        <ScrollProgress position="top" />
        <AchievementNotification />
        <EasterEgg />
        
        {/* Main Content */}
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Certificates />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
        <Footer />
      </div>
      <ButtonGradient />
    </main>
  );
}
