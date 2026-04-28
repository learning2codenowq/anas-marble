// ============================================
// ANAS MARBLE - Main JavaScript
// ============================================

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Active Navigation Link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll Animation Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.card, .product-card, .gallery-item, .trust-item').forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// CONTACT FORM → WHATSAPP
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const phone   = document.getElementById('phone').value.trim();
        const interest = document.getElementById('interest').value;
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !phone || !interest) {
            alert('Please fill in all required fields.');
            return;
        }

        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Build WhatsApp message
        const whatsappMessage = `
*New Enquiry - Anas Marble*

*Name:* ${name}
*Phone:* ${phone}
*Interested In:* ${interest}
*Message:* ${message || 'N/A'}
        `.trim();

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappNumber = '971556764058';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');

        contactForm.reset();
    });
}

// ============================================
// GALLERY LIGHTBOX
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!img) return;

            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,0.92);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeInUp 0.3s ease;
            `;

            lightbox.innerHTML = `
                <div style="position:relative; max-width:90%; max-height:90%;">
                    <span style="
                        position:absolute;
                        top:-45px;
                        right:0;
                        font-size:2.5rem;
                        color:#fff;
                        cursor:pointer;
                        font-weight:300;
                        line-height:1;
                    ">&times;</span>
                    <img src="${img.src}" alt="${img.alt}" style="
                        max-width:100%;
                        max-height:88vh;
                        display:block;
                        border-radius:4px;
                    ">
                </div>
            `;

            document.body.appendChild(lightbox);

            lightbox.querySelector('span').addEventListener('click', () => lightbox.remove());
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.remove();
            });

            document.addEventListener('keydown', function escClose(e) {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    document.removeEventListener('keydown', escClose);
                }
            });
        });
    });
});

// ============================================
// CUSTOM LUXURY CURSOR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const follower = document.createElement('div');
    follower.className = 'cursor-follower';
    document.body.appendChild(follower);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = cursorX + 'px';
        cursor.style.top  = cursorY + 'px';

        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';

        requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
        document.querySelectorAll('a, button, .btn, input, textarea, select, .card, .gallery-item, .product-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }, 100);

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
    });
});