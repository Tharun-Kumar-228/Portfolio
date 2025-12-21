# Personal Portfolio Website

A modern, professional, production-ready personal portfolio website built with React.js and Vite, following a strict **data-driven architecture**.

## 🎯 Features

- ✅ **Data-Driven Architecture** - All content stored in `Contents/` folder as arrays of objects
- ✅ **Modern UI/UX** - Professional design with smooth animations using Framer Motion
- ✅ **Fully Responsive** - Works seamlessly on all devices
- ✅ **Smooth Animations** - GSAP/Framer Motion powered animations
- ✅ **Contact Form** - Integrated EmailJS for form submissions
- ✅ **Easy Content Updates** - Update content by editing data files only

## 📁 Project Structure

```
src/
 ├─ Contents/              # All data files (NO hardcoded content)
 │   ├─ About.js
 │   ├─ Achievements.js
 │   ├─ Projects.js
 │   ├─ Certifications.js
 │   ├─ Skills.js
 │   ├─ Contact.js
 │   ├─ Resume.js
 │
 ├─ components/            # React components
 │   ├─ AboutSection.jsx
 │   ├─ AchievementsSection.jsx
 │   ├─ ProjectsSection.jsx
 │   ├─ CertificationsSection.jsx
 │   ├─ SkillsSection.jsx
 │   ├─ ContactSection.jsx
 │   ├─ ResumeSection.jsx
 │   ├─ Navigation.jsx
 │   ├─ HeroSection.jsx
 │
 ├─ App.jsx
 ├─ main.jsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📝 Updating Content

### Important: Data-Driven Architecture Rule

**❌ NEVER hardcode content in JSX components**
**✅ ALWAYS update content in `Contents/` folder**

### How to Update Content

1. **About Section**: Edit `src/Contents/About.js`
2. **Skills**: Edit `src/Contents/Skills.js`
3. **Projects**: Edit `src/Contents/Projects.js`
4. **Certifications**: Edit `src/Contents/Certifications.js`
5. **Achievements**: Edit `src/Contents/Achievements.js`
6. **Contact Info**: Edit `src/Contents/Contact.js`
7. **Resume**: Edit `src/Contents/Resume.js` and add your PDF to `public/assets/`

### Example: Adding a New Project

Edit `src/Contents/Projects.js`:

```javascript
export const projectsData = [
  // ... existing projects
  {
    id: 4,
    name: "New Project",
    description: "Project description here",
    techStack: ["React", "Node.js"],
    iframeUrl: "PROJECT_DEMO_URL",
    githubUrl: "https://github.com/yourusername",
    liveUrl: "https://yourproject.com"
  }
];
```

## 📧 Setting Up EmailJS

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Update `src/components/ContactSection.jsx`:

```javascript
const serviceId = "YOUR_SERVICE_ID";
const templateId = "YOUR_TEMPLATE_ID";
const publicKey = "YOUR_PUBLIC_KEY";
```

## 🎨 Customization

### Colors & Themes

Edit CSS variables in `src/App.css`:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  /* ... more variables */
}
```

### Animations

All animations use Framer Motion. Customize in component files by adjusting:
- `initial` - Starting animation state
- `animate` - End animation state
- `transition` - Animation timing and easing

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready for deployment.

## 🚢 Deployment

You can deploy this portfolio to:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Follow GitHub Pages deployment guide
- **Any static hosting service**

## 🛠️ Technologies Used

- **React.js** - UI library
- **Vite** - Build tool
- **Framer Motion** - Animation library
- **EmailJS** - Email service
- **React Icons** - Icon library

## 📄 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

---

**Built with ❤️ using React.js and Vite**
