// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initScrollToTop();
    initTypingEffect();
    initProfilePhoto();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('fade-in');
        } else {
            section.classList.add('slide-in-left');
        }
    });

    // Animate skill items
    const skillItems = document.querySelectorAll('.skill-item, .language-item, .cert-item');
    skillItems.forEach((item, index) => {
        // Ensure items are visible immediately
        item.style.opacity = '1';
        item.style.visibility = 'visible';
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Sending message...', 'info');
            
            // Create mailto link
            const mailtoLink = `mailto:shashankgurram03@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            setTimeout(() => {
                window.location.href = mailtoLink;
                showNotification('Email client opened! Please send the email manually.', 'success');
                contactForm.reset();
            }, 1000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Scroll to top functionality
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.innerHTML;
    const highlightSpan = heroTitle.querySelector('.highlight');
    
    if (highlightSpan) {
        const highlightText = highlightSpan.textContent;
        highlightSpan.textContent = '';
        highlightSpan.style.borderRight = '2px solid #fbbf24';
        
        let i = 0;
        const typeWriter = () => {
            if (i < highlightText.length) {
                highlightSpan.textContent += highlightText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    highlightSpan.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-container');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Initialize parallax effect
initParallaxEffect();

// Add loading animation to buttons
function addButtonLoadingEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-primary')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Initialize button effects
addButtonLoadingEffect();

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.skill-item, .timeline-content, .education-item, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize card effects
addCardHoverEffects();

// Add smooth reveal animation for sections
function addSectionRevealAnimation() {
    const sections = document.querySelectorAll('section');
    
    const revealSection = function(entries, observer) {
        const [entry] = entries;
        
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('section-revealed');
        observer.unobserve(entry.target);
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Initialize section reveal animation
addSectionRevealAnimation();

// Add CSS for section reveal animation
const style = document.createElement('style');
style.textContent = `
    .section-hidden {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.6s ease;
    }
    
    .section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// Add active navigation highlighting
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active navigation highlighting
highlightActiveNavLink();

// Add CSS for active navigation link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #2563eb;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(navStyle);

// Add particle effect to hero section (optional enhancement)
function addParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 3 + 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add floating animation
    const floatKeyframes = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = floatKeyframes;
    document.head.appendChild(styleSheet);
}

// Initialize particle effect
addParticleEffect();

// Add smooth transitions for all interactive elements
function addSmoothTransitions() {
    const interactiveElements = document.querySelectorAll('a, button, .skill-item, .timeline-content, .education-item, .stat-item, .social-link');
    
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
}

// Initialize smooth transitions
addSmoothTransitions();

// Add keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
        
        // Enter key activates focused elements
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('nav-link')) {
                focusedElement.click();
            }
        }
    });
}

// Initialize keyboard navigation
addKeyboardNavigation();

// Add performance optimization
function optimizePerformance() {
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize performance optimizations
optimizePerformance();

console.log('Portfolio website loaded successfully! 🚀');

// Debug: Check if skills section is loaded
const skillsSection = document.querySelector('#skills');
const skillItems = document.querySelectorAll('.skill-item, .language-item, .cert-item');
console.log('Skills section found:', !!skillsSection);
console.log('Skill items found:', skillItems.length);

// Force visibility of all skill items
skillItems.forEach((item, index) => {
    item.style.display = 'flex';
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    console.log(`Skill item ${index + 1}:`, item.textContent.trim());
});

// Initialize profile photo handling (hide fallback when image loads)
function initProfilePhoto() {
    const profileImageWrapper = document.querySelector('.profile-image');
    const img = document.querySelector('.profile-photo');
    if (!img || !profileImageWrapper) return;

    const markLoaded = () => {
        profileImageWrapper.classList.add('image-loaded');
    };

    if (img.complete && img.naturalWidth > 0) {
        markLoaded();
    } else {
        img.addEventListener('load', markLoaded);
        img.addEventListener('error', () => {
            console.warn('Profile image failed to load. Showing fallback avatar.');
        });
    }
}
