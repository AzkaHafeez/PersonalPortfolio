import { getHomeProjects, getExperience, getSkills } from "@/lib/content";
import { ScrollIntro } from "@/components/intro/ScrollIntro";
import { FloatingNav } from "@/components/exhibition/FloatingNav";
import { ExhibitionBackground } from "@/components/exhibition/ExhibitionBackground";
import { ProjectRooms } from "@/components/exhibition/ProjectRooms";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const projects = getHomeProjects();
  const experience = getExperience();
  const skills = getSkills();

  return (
    <ScrollIntro>
      <ExhibitionBackground />
      <FloatingNav />
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectRooms projects={projects} />
        <ExperienceSection entries={experience} />
        <SkillsSection categories={skills} />
        <ContactSection />
      </main>
      <Footer />
    </ScrollIntro>
  );
}
