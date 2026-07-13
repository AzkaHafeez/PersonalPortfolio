import {
  getAllProjects,
  getExperience,
  getSkills,
  getTimeline,
} from "@/lib/content";
import { ScrollIntro } from "@/components/intro/ScrollIntro";
import { MinimalHeader } from "@/components/layout/MinimalHeader";
import { ProfileHeader } from "@/components/layout/ProfileHeader";
import { PublicationHome } from "@/components/home/PublicationHome";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  const projects = getAllProjects();
  const experience = getExperience();
  const skills = getSkills();
  const timeline = getTimeline();

  return (
    <ScrollIntro>
      <MinimalHeader />
      <main id="main-content">
        <ProfileHeader
          projectCount={projects.length}
          experienceCount={experience.length}
        />
        <PublicationHome
          projects={projects}
          experience={experience}
          skills={skills}
          timeline={timeline}
        />
      </main>
      <Footer />
    </ScrollIntro>
  );
}
