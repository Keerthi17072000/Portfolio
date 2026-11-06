// ALL the content of the site lives here (from the resume).
// To change text, edit this file — components only decide how it looks/animates.
import type { Education, Experience, Fact, Project, SkillGroup } from '../types'

export const profile = {
  name: 'Keerthivasan R',
  role: 'Frontend Developer',
  location: 'Perambalur, Tamil Nadu — IN',
  email: 'keerthivasan17072000@gmail.com',
  linkedin: 'https://linkedin.com/in/keerthivasan-r-38087a220',
  about:
    'Frontend Developer with 3+ years of experience building responsive, user-friendly web applications using React.js, JavaScript, TypeScript and modern frontend technologies. I craft reusable UI components, integrate REST APIs, manage application state, wrangle data-intensive workflows and obsess over performance, accessibility and cross-device compatibility.',
}

export const marqueeItems = [
  'React.js', 'TypeScript', 'JavaScript ES6+', 'Redux', 'Tailwind CSS', 'Material UI', 'REST APIs',
]

export const facts: Fact[] = [
  { value: 3, suffix: '+', label: 'Years of experience' },
  { value: 6, suffix: '', label: 'Products shipped' },
  { value: 100, suffix: '%', label: 'Responsive, always' },
  { text: 'NL', label: 'Global client work' },
]

export const skills: SkillGroup[] = [
  { title: 'Frontend', items: ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'] },
  { title: 'State & UI', items: ['Redux', 'Material UI (MUI)', 'Tailwind CSS', 'Bootstrap', 'Radix UI'] },
  { title: 'Integration & Tools', items: ['REST API Integration', 'Vite', 'Git & GitHub', 'Typesense'] },
  {
    title: 'Engineering',
    items: ['Responsive Design', 'Reusable Components', 'Performance Optimization', 'Cross-Browser Compat.', 'Debugging'],
  },
]

export const projects: Project[] = [
  {
    code: 'SB', name: 'Supabind', subtitle: 'Data Onboarding Platform', period: 'Frontend development', hue: 262,
    description: 'Data onboarding experience in React & TypeScript — CSV/file upload flows, data preview & editing, transformation workflows, validation and export UI.',
    tags: ['React', 'TypeScript', 'Data Import'],
  },
  {
    code: 'PF', name: 'Promofit', subtitle: 'E-commerce · Netherlands', period: 'Nov 2024 – Sep 2025', hue: 160,
    description: 'Frontend features for a Netherlands-based e-commerce platform: responsive product experiences, API integration and UI enhancements for discovery & ordering.',
    tags: ['React', 'REST API', 'E-commerce'],
  },
  {
    code: 'SF', name: 'Simply Fresh', subtitle: 'E-commerce Platform', period: 'Sep – Oct 2024', hue: 110,
    description: 'Responsive ordering site for fresh vegetables and fruits, built with HTML, CSS and JavaScript around a clear, friendly shopping experience.',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    code: 'SW', name: 'Swaminadhan', subtitle: 'E-commerce Platform', period: 'Jun – Aug 2024', hue: 25,
    description: 'Responsive shopping experiences for pooja essentials and religious products, supporting browsing and ordering across mobile, tablet and desktop.',
    tags: ['Responsive', 'Mobile-first', 'Ordering'],
  },
  {
    code: 'IN', name: 'Inspired', subtitle: 'EdTech Platform', period: 'Nov 2023 – May 2024', hue: 215,
    description: 'Platform helping college students take tests, earn certifications and explore higher-study options. Focus on responsive UI, accessibility and interactive student experiences.',
    tags: ['Accessibility', 'Interactive UI', 'EdTech'],
  },
  {
    code: 'RC', name: 'Renderly Cloud', subtitle: 'SEO Analysis Platform', period: 'Aug – Nov 2023', hue: 320,
    description: 'Web platform for analyzing pages for SEO — responsive interfaces crafted for desktop, tablet and mobile devices.',
    tags: ['SEO', 'Responsive', 'Dashboard'],
  },
]

export const experience: Experience = {
  period: 'Aug 2023 — Present',
  role: 'Junior React Developer',
  company: 'Navabrind IT Solutions Pvt. Ltd.',
  points: [
    'Develop and maintain responsive web application interfaces using React.js, JavaScript and TypeScript.',
    'Build reusable components and interactive user experiences, with state management using Redux and React patterns.',
    'Integrate REST APIs and handle application data, loading states, validation and error scenarios.',
    'Implement responsive layouts using Material UI, Tailwind CSS, Bootstrap and modern CSS techniques.',
    'Work on data-import and transformation workflows — file upload, data preview, editing and export.',
    'Troubleshoot UI issues and improve usability, performance and cross-device compatibility with the team.',
  ],
}

export const education: Education[] = [
  {
    period: 'Sep 2018 — Apr 2022', title: 'B.E. Computer Science & Engineering',
    institute: 'M.A.M. College of Engineering and Technology', badge: '7.53', badgeLabel: 'CGPA',
  },
  {
    period: 'Issued Feb 2023', title: 'Frontend Developer Certification',
    institute: 'Besant Technologies', badge: '✓', badgeLabel: 'Certified',
  },
]
