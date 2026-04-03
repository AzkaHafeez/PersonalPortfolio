// ==========================================
// GSAP Initialization
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// Custom Cursor
// ==========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    
    if (cursorFollower) {
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor?.classList.add('hover');
        cursorFollower?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor?.classList.remove('hover');
        cursorFollower?.classList.remove('hover');
    });
});

// ==========================================
// Loader Animation
// ==========================================
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader?.classList.add('loaded');
        
        // Start hero animations after loader
        setTimeout(() => {
            initHeroAnimations();
        }, 800);
    }, 1500);
});

// ==========================================
// Hero Animations
// ==========================================
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    // Animate hero eyebrow
    tl.to('.hero-eyebrow', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Animate title words
    tl.to('.word', {
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=0.4');
    
    // Animate subtitle
    tl.to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5');
    
    // Animate scroll indicator
    tl.to('.hero-scroll', {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
}

// ==========================================
// Mobile Menu
// ==========================================
const menuBtn = document.querySelector('.nav-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu?.classList.toggle('open');
    document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuBtn?.classList.remove('active');
        mobileMenu?.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ==========================================
// Scroll Reveal Animations
// ==========================================
const revealElements = document.querySelectorAll('.reveal-text, .reveal-up');

revealElements.forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => el.classList.add('revealed'),
        once: true
    });
});

// ==========================================
// Stat Counter Animation
// ==========================================
const stats = document.querySelectorAll('.stat-number[data-count]');

stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(stat, {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                    stat.innerText = Math.round(this.targets()[0].innerText);
                }
            });
        },
        once: true
    });
});

// ==========================================
// Project Cards - Magnetic Effect
// ==========================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(card, {
            x: x * 0.05,
            y: y * 0.05,
            rotation: x * 0.01,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});

// ==========================================
// Email Scramble Effect
// ==========================================
const scrambleText = document.querySelector('.scramble-text');
const originalText = scrambleText?.getAttribute('data-text') || '';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@.';

let scrambleInterval;

scrambleText?.addEventListener('mouseenter', () => {
    let iteration = 0;
    
    clearInterval(scrambleInterval);
    
    scrambleInterval = setInterval(() => {
        scrambleText.innerText = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(scrambleInterval);
        }
        
        iteration += 1/2;
    }, 30);
});

// ==========================================
// Load Projects from JSON
// ==========================================
async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        data.projects.forEach((project, index) => {
            const card = createProjectCard(project, index);
            grid.appendChild(card);
        });
        
        // Reinitialize magnetic effect for new cards
        initMagneticEffect();
        
    } catch (error) {
        console.log('Loading projects from inline data...');
        // Fallback inline data
        const fallbackProjects = [
            {
                id: 'eventhub',
                name: 'EventHub',
                description: 'University societies event platform',
                tags: ['Django', 'DRF', 'JavaScript', 'SQLite'],
                year: '2025',
                page: 'projects/eventhub.html'
            },
            {
                id: 'edunet',
                name: 'Edunet',
                description: 'Offline classroom communication app',
                tags: ['Flutter', 'WebRTC', 'Nearby Connections', 'Hive'],
                year: '2025',
                page: 'projects/edunet.html'
            },
            {
                id: 'aura-pro',
                name: 'AURA Pro',
                description: '3D product showcase landing page',
                tags: ['HTML', 'CSS', 'GSAP', 'Three.js'],
                year: '2026',
                page: 'projects/aura-pro.html'
            },
            {
                id: 'theo-of-evolution',
                name: 'Theo of Evolution',
                description: 'Scroll-driven evolution storytelling site',
                tags: ['React', 'Vite', 'GSAP', 'ScrollTrigger'],
                year: '2026',
                page: 'projects/theo-of-evolution.html'
            }
        ];
        
        fallbackProjects.forEach((project, index) => {
            const card = createProjectCard(project, index);
            grid.appendChild(card);
        });
        
        initMagneticEffect();
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = project.page;
    card.target = '_blank';
    card.className = 'project-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
    
    card.innerHTML = `
        <div class="project-image">
            ${project.image 
                ? `<img src="${project.image}" alt="${project.name}">`
                : `<div class="project-placeholder">${project.name}</div>`
            }
        </div>
        <div class="project-info">
            <div class="project-details">
                <h3 class="project-name">${project.name}</h3>
                <div class="project-tags">${tagsHTML}</div>
            </div>
            <span class="project-year">${project.year}</span>
            <span class="project-arrow">↗</span>
        </div>
    `;
    
    return card;
}

function initMagneticEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(card, {
                x: x * 0.03,
                y: y * 0.03,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Cursor effects
        card.addEventListener('mouseenter', () => {
            cursor?.classList.add('hover');
            cursorFollower?.classList.add('hover');
        });
        card.addEventListener('mouseleave', () => {
            cursor?.classList.remove('hover');
            cursorFollower?.classList.remove('hover');
        });
    });
}

// Initialize projects on load
document.addEventListener('DOMContentLoaded', loadProjects);

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (mobileMenu?.classList.contains('open')) {
            menuBtn?.classList.remove('active');
            mobileMenu?.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
});

// ==========================================
// Parallax Effects
// ==========================================
gsap.to('.visual-circle', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
});

// Skills orbit pause on hover
const skillsOrbit = document.querySelector('.skills-orbit');
skillsOrbit?.addEventListener('mouseenter', () => {
    document.querySelectorAll('.orbit-ring').forEach(ring => {
        ring.style.animationPlayState = 'paused';
    });
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.animationPlayState = 'paused';
    });
});

skillsOrbit?.addEventListener('mouseleave', () => {
    document.querySelectorAll('.orbit-ring').forEach(ring => {
        ring.style.animationPlayState = 'running';
    });
    document.querySelectorAll('.skill').forEach(skill => {
        skill.style.animationPlayState = 'running';
    });
});

// ==========================================
// Page Visibility - Pause animations when tab is hidden
// ==========================================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        gsap.globalTimeline.pause();
    } else {
        gsap.globalTimeline.resume();
    }
});
