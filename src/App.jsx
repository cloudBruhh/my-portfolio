import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Mail, Linkedin, Github, ExternalLink, Moon, Sun, Code, Briefcase, GraduationCap, Target, ChevronUp, Sparkles, Award, Clock, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Add CSS for animations
const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.6s ease-out forwards;
  }

  .animate-slideInRight {
    animation: slideInRight 0.6s ease-out forwards;
  }

  .animate-scaleIn {
    animation: scaleIn 0.5s ease-out forwards;
  }

  .animate-delay-100 { animation-delay: 0.1s; }
  .animate-delay-200 { animation-delay: 0.2s; }
  .animate-delay-300 { animation-delay: 0.3s; }
  .animate-delay-400 { animation-delay: 0.4s; }
  .animate-delay-500 { animation-delay: 0.5s; }

  .opacity-0 { opacity: 0; }

  .hover-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .hover-lift:hover {
    transform: translateY(-5px);
  }

  .skill-bar {
    transition: width 1s ease-out;
  }

  .typing-cursor::after {
    content: '|';
    animation: pulse 1s infinite;
  }

  .gradient-text {
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .btn-shimmer {
    position: relative;
    overflow: hidden;
  }

  .btn-shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }

  .nav-link {
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: #3b82f6;
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  .card-hover {
    transition: all 0.3s ease;
  }

  .card-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
  .stagger-5 { animation-delay: 0.5s; }
  .stagger-6 { animation-delay: 0.6s; }
`;

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Persist dark mode preference
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [skillsVisible, setSkillsVisible] = useState(false);

  const roles = ['Developer in Training', 'UI/UX Enthusiast', 'Problem Solver', 'Lifelong Learner'];
  const [roleIndex, setRoleIndex] = useState(0);

  // Inject styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Typing effect for roles
  useEffect(() => {
    const role = roles[roleIndex];
    let charIndex = 0;
    setTypedText('');

    const typeInterval = setInterval(() => {
      if (charIndex <= role.length) {
        setTypedText(role.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [roleIndex]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
            if (entry.target.id === 'experience') {
              setSkillsVisible(true);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      setShowScrollTop(window.scrollY > 500);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const result = await emailjs.send(
        'service_wsx4nsh',
        'template_3tfv9y4',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        'C-1JVduTWhtFYUQHN'
      );

      if (result.text === 'OK') {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setFormStatus('error');
      console.error('EmailJS Error:', error);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const skills = [
    { name: 'JavaScript/React', level: 10, icon: '⚛️' },
    { name: 'Python', level: 70, icon: '🐍' },
    { name: 'Node.js', level: 10, icon: '🟢' },
    { name: 'SQL/Databases', level: 75, icon: '🗃️' },
    { name: 'UI/UX Design', level: 70, icon: '🎨' },
    { name: 'C-programming', level: 75, icon: '⚙️' }
  ];

  const experiences = [
    {
      title: 'Berozgar',
      company: 'Filler',
      period: '2022 - Present',
      description: 'pheri kaam pani kosle dinxa underage lai ta.'
    },
    {
      title: 'NIST College le chapyo',
      company: 'Filler',
      period: '2020 - 2022',
      description: 'Aba hyar kati assignments haru dinthyo ta k vannu.'
    },
    {
      title: 'Baccha Thiye',
      company: 'Filler',
      period: '2018 - 2020',
      description: 'Moj thyo jiwan ta'
    }
  ];

  const projects = [
    {
      title: 'C programming',
      description: 'Just practicing C programming language and its concepts.',
      tools: ['C Programming'],
      results: 'Increased problem-solving skills and self productivity',
      link: '#',
      github: 'https://github.com/cloudBruhh/C-proramming',
      image: '🔧'
    },
    {
      title: 'CRUD operation',
      description: 'Did a CRUD operation project using MySQL and phpMyAdmin for database management.',
      tools: ['MySQL', 'PHP', 'phpMyAdmin'],
      results: 'Learned database management and backend development',
      link: '#',
      github: 'https://github.com/cloudBruhh/project',
      image: '🗄️'
    },
    {
      title: 'Python Projects',
      description: 'beginner level python programs for entry level programmers.',
      tools: ['Python'],
      results: 'Enhanced understanding of Python programming and its applications',
      link: '#',
      github: 'https://github.com/cloudBruhh/Python-programming-',
      image: '🐍'
    },
    {
      title: 'This Portfolio Website',
      description: 'just in case someone wants to see the code behind this portfolio website or wants to make a similar one.',
      tools: ['React', 'Tailwind CSS'],
      results: 'Well-structured and visually appealing portfolio website, simplistic and aesthetic design',
      link: '#',
      github: 'https://github.com/cloudBruhh/my-portfolio',
      image: '🌐'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '10+', icon: <Code size={24} /> },
    { label: 'Technologies Learned', value: '8+', icon: <Sparkles size={24} /> },
    { label: 'Cups of Coffee', value: '∞', icon: <Award size={24} /> },
  ];

  // Loading Screen
  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="text-center animate-fadeIn">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className={`absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
          </div>
          <p className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold transition-transform duration-300 hover:scale-105"
            >
              Portfolio
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link transition-colors duration-300 ${activeSection === item.id
                    ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} active`
                    : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="transition-transform duration-300 hover:scale-110"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded transition-all duration-300 ${activeSection === item.id
                    ? isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600'
                    : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className={`min-h-screen flex items-center justify-center px-4 pt-16 ${visibleSections.has('home') ? '' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${visibleSections.has('home') ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <span className="gradient-text">Ashwin Thapa</span>
          </h1>
          <p className={`text-xl md:text-2xl mb-4 h-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ${visibleSections.has('home') ? 'animate-fadeInUp animate-delay-200' : 'opacity-0'}`}>
            <span className="typing-cursor">{typedText}</span>
          </p>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${visibleSections.has('home') ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'}`}>
            Crafting elegant solutions to complex problems. Passionate about building scalable applications that deliver exceptional user experiences.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${visibleSections.has('home') ? 'animate-fadeInUp animate-delay-400' : 'opacity-0'}`}>
            <a
              href="/portfolio.pdf"
              download
              className={`btn-shimmer px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} flex items-center justify-center gap-2`}
            >
              <Download size={20} />
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${isDarkMode ? 'border-2 border-gray-600 hover:bg-gray-800 hover:border-blue-500' : 'border-2 border-gray-300 hover:bg-gray-50 hover:border-blue-500'} flex items-center justify-center gap-2`}
            >
              <Mail size={20} />
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${visibleSections.has('about') ? 'animate-fadeInUp' : 'opacity-0'}`}>
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={visibleSections.has('about') ? 'animate-slideInLeft' : 'opacity-0'}>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase size={24} className="text-blue-500" />
                Professional Summary
              </h3>
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I am just a kid learning to build years of experience building scalable web applications. Always a yearner and I yearn for improvement. Committed to writing clean, maintainable code and delivering high-quality solutions.
              </p>
            </div>
            <div className={visibleSections.has('about') ? 'animate-slideInRight' : 'opacity-0'}>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap size={24} className="text-blue-500" />
                Education
              </h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white hover:shadow-md'}`}>
                  <p className="font-semibold">Bachelor of Science in Computer Science and Information Technology</p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Currently Pursuing, Asian School of Management and Technology</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-12 ${visibleSections.has('about') ? 'animate-fadeInUp animate-delay-300' : 'opacity-0'}`}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Target size={24} className="text-blue-500" />
              Career Goals
            </h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Seeking opportunities to leverage my expertise in full-stack development to build innovative products that solve real-world problems. Passionate about mentoring, continuous learning, and contributing to open-source communities.
            </p>
          </div>
          {/* Additional Info */}
          <div className="flex items-center gap-2 mt-4">
            <MapPin size={20} className="text-blue-500" />
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Based in Nepal</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Clock size={20} className="text-blue-500" />
            <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>The time is yet to come</span>
          </div>
        </div>
      </section>

      {/* Experience & Skills Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${visibleSections.has('experience') ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Experience & Skills
          </h2>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className={`text-2xl font-semibold mb-8 ${visibleSections.has('experience') ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Work Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`border-l-4 pl-6 transition-all duration-300 hover:pl-8 ${isDarkMode ? 'border-blue-400 hover:border-blue-300' : 'border-blue-600 hover:border-blue-500'} ${visibleSections.has('experience') ? `animate-slideInLeft stagger-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold">{exp.title}</h4>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.period}</span>
                  </div>
                  <p className={`font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company}</p>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className={`text-2xl font-semibold mb-8 ${visibleSections.has('experience') ? 'animate-fadeInUp' : 'opacity-0'}`}>
              Technical Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`group ${visibleSections.has('experience') ? `animate-fadeInUp stagger-${index + 1}` : 'opacity-0'}`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <span className="transition-transform duration-300 group-hover:scale-125">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{skill.level}%</span>
                  </div>
                  <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full skill-bar ${isDarkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                      style={{ width: skillsVisible ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${visibleSections.has('projects') ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`card-hover rounded-lg p-6 ${isDarkMode ? 'bg-gray-900' : 'bg-white shadow-md'} ${visibleSections.has('projects') ? `animate-scaleIn stagger-${index + 1}` : 'opacity-0'}`}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110 inline-block">
                  {project.image}
                </div>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Tools Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs transition-all duration-300 hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <p className={`text-sm mb-4 font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {project.results}
                </p>
                <div className="flex gap-4">
                  <a
                    href={project.link}
                    className={`flex items-center gap-1 text-sm transition-all duration-300 hover:gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className={`flex items-center gap-1 text-sm transition-all duration-300 hover:gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl font-bold mb-12 text-center ${visibleSections.has('contact') ? 'animate-fadeInUp' : 'opacity-0'}`}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className={visibleSections.has('contact') ? 'animate-slideInLeft' : 'opacity-0'}>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
              </p>
              <div className="space-y-4">
                <a
                  href="mailto:ashwinthapa34009@gmail.com"
                  className={`flex items-center gap-3 transition-all duration-300 hover:gap-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Mail size={24} />
                  ashwinthapa34009@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/ashwin-thapa-4a68433a7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-all duration-300 hover:gap-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Linkedin size={24} />
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/cloudBruhh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition-all duration-300 hover:gap-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  <Github size={24} />
                  GitHub Profile
                </a>
              </div>
            </div>
            <div className={visibleSections.has('contact') ? 'animate-slideInRight' : 'opacity-0'}>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'} focus:outline-none`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'} focus:outline-none`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' : 'bg-white border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'} focus:outline-none resize-none`}
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                  >
                    {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? '✓ Message Sent!' : formStatus === 'error' ? 'Failed - Try Again' : 'Send Message'}
                  </button>
                  {formStatus === 'success' && (
                    <p className="text-green-500 text-center animate-fadeIn">Thank you! I'll get back to you soon.</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 text-center ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
        <p className={`transition-colors duration-300 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          © 2026 Ashwin Thapa. Built with React & Tailwind CSS.
        </p>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 p-3 rounded-full transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'} hover:scale-110 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} shadow-lg`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </div>
  );
}