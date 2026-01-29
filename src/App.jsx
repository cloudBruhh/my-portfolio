import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Download, Mail, Linkedin, Github, ExternalLink, Moon, Sun, Code, Briefcase, GraduationCap, Target, ChevronUp, Sparkles, Award, Clock, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

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

  const roles = ['Developer in Training', 'UI/UX Enthusiast', 'Problem Solver', 'Lifelong Learner'];
  const [roleIndex, setRoleIndex] = useState(0);

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
        'template_omaz1it',
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
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className={`absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
          </div>
          <p className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={() => scrollToSection('home')} className="text-xl font-bold">
              Portfolio
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors ${activeSection === item.id
                    ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button onClick={toggleDarkMode} className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded transition-colors ${activeSection === item.id
                    ? isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-gray-100 text-blue-600'
                    : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Ashwin Thapa
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-600 dark:text-gray-300">
            Devoloper in training & UI/UX Enthusiast
          </p>
          <p className="text-lg mb-8 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Crafting elegant solutions to complex problems. Passionate about building scalable applications that deliver exceptional user experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <a href="/portfolio.pdf" download className={`px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
              } flex items-center justify-center gap-2`}>
              <Download size={20} />
              Download Resume
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${isDarkMode ? 'border-2 border-gray-600 hover:bg-gray-800' : 'border-2 border-gray-300 hover:bg-gray-50'
                } flex items-center justify-center gap-2`}
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
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Briefcase size={24} />
                Professional Summary
              </h3>
              <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I am just a kid learning to build years of experience building scalable web applications.Always a yearner and  I yearn for  improvement. Committed to writing clean, maintainable code and delivering high-quality solutions.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <GraduationCap size={24} />
                Education
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Bachelor of Science in Computer Science and Information Technology</p>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Currently Pursuing, Asian School of Management and Technology</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Target size={24} />
              Career Goals
            </h3>
            <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Seeking opportunities to leverage my expertise in full-stack development to build innovative products that solve real-world problems. Passionate about mentoring, continuous learning, and contributing to open-source communities.
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Skills Section */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience & Skills</h2>

          {/* Experience Timeline */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">Work Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className={`border-l-4 pl-6 ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}>
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
            <h3 className="text-2xl font-semibold mb-8">Technical Skills</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{skill.level}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${isDarkMode ? 'bg-blue-500' : 'bg-blue-600'}`}
                      style={{ width: `${skill.level}%` }}
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
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 transition-all hover:shadow-xl transform hover:-translate-y-1 ${isDarkMode ? 'bg-gray-900 hover:bg-gray-850' : 'bg-white hover:shadow-2xl'
                  }`}
              >
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Tools Used:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}
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
                  <a href={project.link} className={`flex items-center gap-1 text-sm hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} Target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  <a href={project.github} className={`flex items-center gap-1 text-sm hover:underline ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} Target="_blank" rel="noopener noreferrer">
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
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className={`mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
              </p>
              <div className="space-y-4">
                <a href="mailto:ashwinthapa34009@gmail.com" className={`flex items-center gap-3 transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Mail size={24} />
                  ashwinthapa34009@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/ashwin-thapa-4a68433a7/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Linkedin size={24} />
                  LinkedIn Profile
                </a>
                <a href="https://github.com/cloudBruhh" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 transition-colors ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Github size={24} />
                  GitHub Profile
                </a>
              </div>
            </div>
            <div>
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
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-600'
                        } focus:outline-none`}
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
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-600'
                        } focus:outline-none`}
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
                      className={`w-full px-4 py-2 rounded-lg border transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 focus:border-blue-500' : 'bg-white border-gray-300 focus:border-blue-600'
                        } focus:outline-none resize-none`}
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'sending'}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 text-center ${isDarkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-50 border-t border-gray-200'}`}>
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          © 2026 Ashwin Thapa. Built with React & Tailwind CSS.
        </p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-4 right-4 p-3 rounded-full transition-all transform hover:scale-110 ${isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            } shadow-lg`}
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}