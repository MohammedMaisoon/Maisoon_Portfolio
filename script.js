// Complete Portfolio JavaScript Code - Merged and Optimized
// Note: localStorage functionality removed for Claude.ai compatibility

// Global variables for theme state
let currentTheme = 'dark';
let formStartTime = null;
let fieldInteractions = {};

// Loading Screen
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 3000); // Show loading for 3 seconds
});

// Theme toggle functionality - Modified to use variable instead of localStorage
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        currentTheme = 'dark';
    } else {
        body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        currentTheme = 'light';
    }
}

// Load saved theme - Modified to use default dark theme
document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('theme-icon');
    
    // Default to dark theme since we can't use localStorage
    if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from refreshing the page
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const subject = formData.get('subject')?.trim();
            const message = formData.get('message')?.trim();
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
            this.classList.add('form-loading');
            
            // Simulate sending process and then open email client
            setTimeout(() => {
                // Create mailto link with all form data
                const mailtoSubject = `Portfolio Contact: ${subject}`;
                const mailtoBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Mohammed Maisoon's Portfolio Website`;
                
                const mailtoLink = `mailto:mmohammedmaisoon@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`;
                
                // Try to open email client
                try {
                    window.location.href = mailtoLink;
                    showNotification('Opening your email client to send the message...', 'success');
                    
                    // Reset form after successful submission
                    setTimeout(() => {
                        this.reset();
                        showNotification('Form cleared. Thank you for your interest!', 'info');
                    }, 2000);
                    
                } catch (error) {
                    console.error('Error opening email client:', error);
                    showNotification('Please copy this email: mmohammedmaisoon@gmail.com', 'error');
                }
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                this.classList.remove('form-loading');
                
            }, 1500); // Add slight delay for better UX
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
        default:
            icon = '<i class="fas fa-bell"></i>';
    }
    
    notification.innerHTML = `${icon} <span>${message}</span>`;
    
    // Add notification styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '10px',
        color: '#fff',
        fontWeight: 'bold',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-20px)',
        transition: 'all 0.3s ease',
        backgroundColor: type === 'success' ? '#00ffff' : type === 'error' ? '#ff4757' : '#40e0d0',
        color: type === 'success' ? '#0a0f1c' : type === 'error' ? '#fff' : '#0a0f1c',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '300px',
        maxWidth: '400px',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.education-item, .internship-item, .skill-category, .project-card, .stat-item, .education-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));
});

// Stats counter animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + (element.textContent.includes('+') ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        animateValue(stat, 0, target, 2000);
    });
}

// Trigger stats animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect after loading screen
setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    
    if (heroTitle && heroSubtitle) {
        const originalTitle = heroTitle.textContent;
        const originalSubtitle = heroSubtitle.textContent;
        
        // Add cursor effect
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .typing-cursor::after {
                content: '|';
                animation: blink 1s infinite;
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(cursorStyle);
        
        setTimeout(() => {
            heroTitle.classList.add('typing-cursor');
            typeWriter(heroTitle, originalTitle, 150);
        }, 3500);
        
        setTimeout(() => {
            heroTitle.classList.remove('typing-cursor');
            heroSubtitle.classList.add('typing-cursor');
            typeWriter(heroSubtitle, originalSubtitle, 100);
            
            setTimeout(() => {
                heroSubtitle.classList.remove('typing-cursor');
            }, 2000);
        }, 5000);
    }
}, 100);

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add CSS for animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-primary);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-accent);
        cursor: pointer;
        padding: 0.2rem;
        border-radius: 3px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        color: var(--accent-primary);
        background: var(--card-bg);
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-info {
        border-left: 4px solid var(--accent-primary);
    }
    
    .education-card,
    .skill-category,
    .project-card,
    .stat-item,
    .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .education-card.animate,
    .skill-category.animate,
    .project-card.animate,
    .stat-item.animate,
    .contact-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links a.active {
        color: #00ffff;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
    
    .form-loading .btn {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .form-loading .btn i {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

document.head.appendChild(notificationStyles);

// Add mobile menu toggle functionality
function createMobileMenu() {
    const nav = document.querySelector('nav .nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    if (!nav || !navLinks) return;
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Add mobile styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 250px;
                height: calc(100vh - 70px);
                background: var(--nav-bg);
                backdrop-filter: blur(10px);
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                padding-top: 2rem;
                transition: right 0.3s ease;
                border-left: 1px solid var(--border-color);
            }
            
            .nav-links.mobile-active {
                right: 0;
            }
            
            .nav-links li {
                margin: 1rem 0;
            }
        }
    `;
    
    document.head.appendChild(mobileStyles);
    nav.insertBefore(mobileMenuBtn, nav.lastElementChild);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        this.innerHTML = navLinks.classList.contains('mobile-active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', createMobileMenu);

// Add smooth reveal animations
function addRevealAnimations() {
    const revealElements = document.querySelectorAll('.section-title, .about-text, .contact-info');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(el);
    });
}

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', addRevealAnimations);

// Add particles effect to hero background
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    Object.assign(particlesContainer.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: '0'
    });
    
    hero.appendChild(particlesContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        Object.assign(particle.style, {
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: '#00ffff',
            borderRadius: '50%',
            left: Math.random() * 100 + '%',
            animationDuration: (Math.random() * 10 + 5) + 's',
            animationDelay: Math.random() * 5 + 's',
            animationName: 'float',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
            opacity: Math.random() * 0.5 + 0.2
        });
        
        particlesContainer.appendChild(particle);
    }
    
    // Add floating animation
    const floatAnimation = document.createElement('style');
    floatAnimation.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); }
            100% { transform: translateY(-100px) rotate(360deg); }
        }
    `;
    document.head.appendChild(floatAnimation);
}

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    Object.assign(progressBar.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        height: '3px',
        background: 'linear-gradient(45deg, #00ffff, #40e0d0)',
        zIndex: '10000',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        transition: 'transform 0.1s ease'
    });
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
        progressBar.style.width = '100%';
    });
}

// Initialize scroll progress indicator
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Add interactive hover effects for social links
document.addEventListener('DOMContentLoaded', () => {
    const socialLinks = document.querySelectorAll('.hero-social-links a, .about-social-links a, .contact-social-links a, .education-social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add form field focus effects
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('filled');
            } else {
                this.parentElement.classList.remove('filled');
            }
        });
    });
    
    // Add focused/filled styles
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group.focused label {
            color: #40e0d0 !important;
        }
        
        .form-group.focused input,
        .form-group.focused textarea {
            border-color: #40e0d0 !important;
            box-shadow: 0 0 15px rgba(64, 224, 208, 0.2) !important;
        }
        
        .form-group.filled label {
            color: #00ffff !important;
        }
    `;
    document.head.appendChild(formStyle);
});

// Add loading animation
function showLoadingAnimation() {
    const loading = document.createElement('div');
    loading.id = 'loading-screen';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-logo">MM</div>
            <div class="loading-text">Loading Portfolio...</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        #loading-screen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0f1c;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .loading-content {
            text-align: center;
            color: #00ffff;
        }
        
        .loading-logo {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(45deg, #00ffff, #40e0d0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .loading-text {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: #b0d4c1;
        }
        
        .loading-bar {
            width: 200px;
            height: 4px;
            background: rgba(0, 255, 255, 0.2);
            border-radius: 2px;
            overflow: hidden;
            margin: 0 auto;
        }
        
        .loading-progress {
            height: 100%;
            background: linear-gradient(45deg, #00ffff, #40e0d0);
            border-radius: 2px;
            animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }
    `;
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loading);
    
    // Remove loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
            }, 500);
        }, 1500);
    });
}

// Show loading animation
showLoadingAnimation();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Only trigger shortcuts if not typing in input fields
    if (e.target.matches('input, textarea, select')) return;
    
    switch(e.key.toLowerCase()) {
        case 'c':
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'h':
            document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'p':
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'a':
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 's':
            document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            break;
        case 'escape':
            // Close notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => notification.click());
            break;
    }
});

// Add smooth scrolling to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Add styles for scroll to top button
    const scrollBtnStyle = document.createElement('style');
    scrollBtnStyle.textContent = `
        #scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #00ffff, #40e0d0);
            color: #0a0f1c;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3);
        }
        
        #scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        #scroll-to-top:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 255, 255, 0.5);
        }
        
        #scroll-to-top:active {
            transform: translateY(-1px);
        }
    `;
    document.head.appendChild(scrollBtnStyle);
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', addScrollToTopButton);

// Add theme toggle functionality (dark/light mode) - Modified to not use localStorage
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    themeToggle.title = 'Toggle Dark/Light Mode';
    
    // Add theme toggle styles
    const themeStyle = document.createElement('style');
    themeStyle.textContent = `
        #theme-toggle {
            position: fixed;
            top: 20px;
            right: 80px;
            width: 40px;
            height: 40px;
            background: rgba(0, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 50%;
            color: #00ffff;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #theme-toggle:hover {
            background: rgba(0, 255, 255, 0.2);
            transform: scale(1.1);
        }
        
        /* Light theme styles */
        body.light-theme {
            background: #f8f9fa !important;
            color: #2c3e50 !important;
        }
        
        body.light-theme .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        
        body.light-theme section {
            background: #ffffff !important;
            color: #2c3e50 !important;
        }
        
        body.light-theme .nav-container {
            background: rgba(255, 255, 255, 0.95) !important;
        }
        
        body.light-theme .nav-links a {
            color: #2c3e50 !important;
        }
        
        body.light-theme .btn {
            background: linear-gradient(45deg, #667eea, #764ba2) !important;
        }
        
        @media (max-width: 768px) {
            #theme-toggle {
                top: 15px;
                right: 60px;
                width: 35px;
                height: 35px;
            }
        }
    `;
    document.head.appendChild(themeStyle);
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality - Modified to not use localStorage
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
            currentTheme = 'light';
            showNotification('Switched to light theme', 'info');
        } else {
            icon.className = 'fas fa-moon';
            currentTheme = 'dark';
            showNotification('Switched to dark theme', 'info');
        }
    });
}

// Initialize theme toggle
document.addEventListener('DOMContentLoaded', addThemeToggle);

// Add contact form reset functionality
function resetContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    // Add reset button
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn btn-secondary';
    resetBtn.innerHTML = '<i class="fas fa-undo"></i> Reset Form';
    resetBtn.style.marginLeft = '10px';
    
    // Find submit button and add reset button next to it
    const submitBtn = form.querySelector('.btn');
    if (submitBtn && submitBtn.parentNode) {
        submitBtn.parentNode.appendChild(resetBtn);
    }
    
    // Reset button functionality
    resetBtn.addEventListener('click', () => {
        form.reset();
        
        // Remove focused/filled classes from form groups
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('focused', 'filled');
        });
        
        showNotification('Form has been reset.', 'info');
    });
}

// Initialize contact form reset
document.addEventListener('DOMContentLoaded', resetContactForm);

// Copy to clipboard function
window.copyToClipboard = function(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email address copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
};

// Fallback copy function for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Email address copied to clipboard!', 'success');
    } catch (err) {
        showNotification('Could not copy email. Please select manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Initialize copy email feature
document.addEventListener('DOMContentLoaded', addCopyEmailFeature);

// Add form validation enhancement
function enhanceFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Validate individual form fields
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const formGroup = field.closest('.form-group');
    
    // Remove existing error styling
    field.classList.remove('error');
    let existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Field-specific validation
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    // Show error if invalid
    if (!isValid && value.length > 0) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);
    }
    
    return isValid;
}

// Add validation styles
const validationStyle = document.createElement('style');
validationStyle.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 10px rgba(255, 71, 87, 0.3) !important;
    }
    
    .field-error {
        color: #ff4757;
        font-size: 0.8rem;
        margin-top: 5px;
        display: block;
    }
`;
document.head.appendChild(validationStyle);

// Initialize form validation enhancement
document.addEventListener('DOMContentLoaded', enhanceFormValidation);

// Add contact form analytics (simple tracking)
function trackFormInteraction() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Track when user starts filling the form
    form.addEventListener('focusin', function(e) {
        if (!formStartTime) {
            formStartTime = Date.now();
            console.log('User started filling contact form');
        }
        
        const fieldName = e.target.name;
        if (fieldName && !fieldInteractions[fieldName]) {
            fieldInteractions[fieldName] = {
                focused: Date.now(),
                interactions: 0
            };
        }
    });
    
    // Track field interactions
    form.addEventListener('input', function(e) {
        const fieldName = e.target.name;
        if (fieldName && fieldInteractions[fieldName]) {
            fieldInteractions[fieldName].interactions++;
        }
    });
    
    // Track form submission attempt
    form.addEventListener('submit', function() {
        const timeSpent = formStartTime ? (Date.now() - formStartTime) / 1000 : 0;
        console.log('Form submission analytics:', {
            timeSpent: timeSpent + ' seconds',
            fieldInteractions: fieldInteractions,
            timestamp: new Date().toISOString()
        });
    });
}

// Initialize form analytics
document.addEventListener('DOMContentLoaded', trackFormInteraction);

// Add performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime + 'ms');
                } else {
                    console.log('Page loaded successfully in:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Add accessibility improvements
function improveAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    const skipStyle = document.createElement('style');
    skipStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #00ffff;
            color: #0a0f1c;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10002;
            font-weight: bold;
            transition: top 0.3s ease;
        }
        
        .skip-link:focus {
            top: 6px;
        }
    `;
    document.head.appendChild(skipStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
        heroSection.setAttribute('tabindex', '-1');
    }
    
    // Improve focus indicators
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        *:focus {
            outline: 2px solid #00ffff !important;
            outline-offset: 2px !important;
        }
        
        .btn:focus {
            box-shadow: 0 0 0 3px rgba(0, 255, 255, 0.5) !important;
        }
    `;
    document.head.appendChild(focusStyle);
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Add error boundary for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    
    // Show user-friendly error notification
    showNotification('Something went wrong. Please refresh the page if issues persist.', 'error');
    
    // Log error details for debugging
    console.log('Error details:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        stack: e.error ? e.error.stack : 'No stack trace available'
    });
});

// Add unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Prevent the default browser behavior
    e.preventDefault();
    
    // Show user-friendly notification
    showNotification('An error occurred. Please try again.', 'error');
});

// Error handling for missing elements
function handleMissingElements() {
    const criticalElements = ['#contact-form', '.hero', 'nav'];
    
    criticalElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Important element missing: ${selector}`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Add smooth reveal animations for sections
function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, revealOptions);
    
    sections.forEach(section => {
        section.classList.add('reveal');
        revealObserver.observe(section);
    });
    
    // Add reveal styles
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyle);
}

// Initialize section reveal animations
document.addEventListener('DOMContentLoaded', initSectionReveal);

// Console welcome message
console.log(`
%c🚀 Welcome to Mohammed Maisoon's Portfolio! %c
%cThanks for checking out the console! 
If you're interested in collaborating or have any questions, 
feel free to reach out at: mmohammedmaisoon@gmail.com

%c💻 Built with modern web technologies
%c⚡ Optimized for performance and accessibility
%c🎨 Designed with attention to detail
`, 
'color: #00ffff; font-size: 20px; font-weight: bold;',
'',
'color: #40e0d0; font-size: 14px;',
'color: #00ffff; font-size: 12px;',
'color: #40e0d0; font-size: 12px;',
'color: #20b2aa; font-size: 12px;'
);

// Final initialization message
console.log('%c✅ Portfolio JavaScript loaded successfully!', 'color: #00ffff; font-weight: bold; font-size: 14px;');
console.log('%cContact form is ready - no page refresh on submit!', 'color: #40e0d0; font-size: 12px;');

// Export functions for potential external use
window.portfolioUtils = {
    showNotification,
    copyToClipboard,
    isValidEmail,
    validateField,
    toggleTheme
};