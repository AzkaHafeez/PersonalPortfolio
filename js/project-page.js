// ==========================================
// Project Page JavaScript
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
const hoverElements = document.querySelectorAll('a, button, .tech-item');
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
// Page Load Animations
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    
    // Animate back link
    tl.from('.project-back', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power3.out'
    });
    
    // Animate title
    tl.from('.project-hero-title', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3');
    
    // Animate meta items
    tl.from('.meta-item', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.4');
});

// ==========================================
// Scroll Animations
// ==========================================
const sections = document.querySelectorAll('.project-section');

sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out'
    });
});

// ==========================================
// Tech Stack Hover Effect
// ==========================================
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ==========================================
// Project Links Hover Effect
// ==========================================
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// ==========================================
// Smooth Page Transition (Back Link)
// ==========================================
const backLink = document.querySelector('.project-back');

backLink?.addEventListener('click', (e) => {
    e.preventDefault();
    const href = backLink.getAttribute('href');
    
    gsap.to('body', {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
            window.location.href = href;
        }
    });
});
