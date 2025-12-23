import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
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
import BackgroundReactive from "./components/BackgroundReactive";
import WelcomeScreen from "./components/WelcomeScreen";
import { useTheme } from "./hooks/useTheme";
import "./App.css";
import EducationSection from "./components/EducationSection";
import CodingProfilesSection from "./components/CodingProfilesSection";

function App() {
  // Initialize theme on mount
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure theme is applied immediately
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="App">
      <CursorTracker />

      <AnimatePresence mode="wait">
        {isLoading && (
          <WelcomeScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <BackgroundReactive />
          <Navigation />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <EducationSection />
          <ProjectsSection />
          <CertificationsSection />
          <AchievementsSection />
          <CodingProfilesSection />
          <ResumeSection />
          <ContactSection />
        </>
      )}
    </div>
  );
}

export default App;
