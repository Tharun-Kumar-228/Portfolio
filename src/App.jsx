import { useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import AchievementsSection from "./components/AchievementsSection";
import ResumeSection from "./components/ResumeSection";
import ContactSection from "./components/ContactSection";
import CursorTracker from "./components/CursorTracker";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

function App() {
  // Initialize theme on mount
  const { theme } = useTheme();

  useEffect(() => {
    // Ensure theme is applied immediately
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <CursorTracker />
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
