import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import AchievementsSection from "./components/AchievementsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificationsSection />
      <AchievementsSection />
      <ResumeSection />
      <ContactSection />
    </div>
  );
}

export default App;
