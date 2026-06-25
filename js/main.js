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

// Active Navigation Link (single-page anchor-based)
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
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
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
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
    }
});

// ============================================
// HERO SLIDESHOW
// ============================================
(function() {
    const slides = document.querySelectorAll('.hero-slide');
    if (!slides.length) return;

    function setHeroImages() {
        const isPortrait = window.innerHeight > window.innerWidth;
        slides.forEach(slide => {
            const src = isPortrait ? slide.dataset.mobile : slide.dataset.desktop;
            slide.style.backgroundImage = `url('${src}')`;
        });
    }

    setHeroImages();
    window.addEventListener('resize', setHeroImages);
    window.addEventListener('orientationchange', setHeroImages);

    let current = 0;

    function nextSlide() {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }

    setInterval(nextSlide, 4000);
})();
// ============================================
// RANGE CAROUSEL — mobile/desktop image swap
// ============================================
(function() {
    const cards = document.querySelectorAll('.range-card');
    if (!cards.length) return;

    function setRangeImages() {
        const isPortrait = window.innerHeight > window.innerWidth;
        cards.forEach(card => {
            const src = isPortrait ? card.dataset.mobile : card.dataset.desktop;
            if (src) card.style.backgroundImage = `url('${src}')`;
        });
    }

    setRangeImages();
    window.addEventListener('resize', setRangeImages);
    window.addEventListener('orientationchange', setRangeImages);
})();

// ============================================
// STATS BAR — animated count up
// ============================================
(function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let animated = false;

    function countUp(el) {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const plus = el.nextElementSibling;
        const duration = 1800;
        const stepTime = 16;
        const steps = Math.floor(duration / stepTime);
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.round((step / steps) * target);
            el.textContent = current;

            if (step >= steps) {
                el.textContent = target;
                clearInterval(timer);
                if (plus && plus.classList.contains('stat-plus')) {
                    plus.classList.add('visible');
                }
            }
        }, stepTime);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(el => countUp(el));
                observer.disconnect();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px 50px 0px' });

    const statsBar = document.getElementById('stats');
    if (statsBar) observer.observe(statsBar);
})();

// ============================================
// OUR RANGE CAROUSEL
// ============================================
(function() {
    const carousel = document.getElementById('rangeCarousel');
    const prevBtn = document.querySelector('.range-arrow-left');
    const nextBtn = document.querySelector('.range-arrow-right');
    if (!carousel) return;

    const scrollAmount = () => {
        const card = carousel.querySelector('.range-card');
        return card ? card.offsetWidth + 24 : 400;
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });
    }

    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('grabbing');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('grabbing');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('grabbing');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });
})();

// ============================================
// FORM — same as phone + WhatsApp submit
// ============================================
(function() {
    const phoneInput = document.getElementById('phoneInput');
    const whatsappInput = document.getElementById('whatsappInput');
    const sameAsPhone = document.getElementById('sameAsPhone');
    const form = document.getElementById('projectForm');

    const phoneCodeSelect = document.getElementById('phoneCode');
    const whatsappCodeSelect = document.getElementById('whatsappCode');

    function syncWhatsapp() {
        if (sameAsPhone.checked) {
            whatsappInput.value = phoneInput.value;
            whatsappInput.disabled = true;
            if (whatsappCodeSelect && phoneCodeSelect) {
                whatsappCodeSelect.value = phoneCodeSelect.value;
                whatsappCodeSelect.disabled = true;
            }
        }
    }

    if (sameAsPhone && phoneInput && whatsappInput) {
        sameAsPhone.addEventListener('change', () => {
            if (sameAsPhone.checked) {
                syncWhatsapp();
            } else {
                whatsappInput.disabled = false;
                if (whatsappCodeSelect) whatsappCodeSelect.disabled = false;
            }
        });

        phoneInput.addEventListener('input', syncWhatsapp);
        if (phoneCodeSelect) {
            phoneCodeSelect.addEventListener('change', syncWhatsapp);
        }
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = form.querySelector('[name="name"]').value.trim();
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const whatsapp = whatsappInput ? whatsappInput.value.trim() : '';
            const projectType = form.querySelector('[name="project_type"]').value;
            const stage = form.querySelector('[name="project_stage"]').value;
            const location = form.querySelector('[name="project_location"]').value;
            const material = form.querySelector('[name="material"]').value;
            const vision = form.querySelector('[name="vision"]').value.trim();
            const email = form.querySelector('[name="email"]').value.trim();

            const checkedItems = [...form.querySelectorAll('[name="work"]:checked')]
                .map(el => el.value).join(', ');

            if (!name || !phone || !whatsapp || !projectType || !location || !stage || !checkedItems) {
                alert('Please fill in all required fields and select at least one area you are working on.');
                return;
            }

            const phoneCode = phoneCodeSelect ? phoneCodeSelect.value : '+971';
            const whatsappCode = whatsappCodeSelect ? whatsappCodeSelect.value : '+971';

            const message = `
*New Project Enquiry — Anas Marble*

*Name:* ${name}
*Phone:* ${phoneCode}${phone}
*WhatsApp:* ${whatsappCode}${whatsapp}
${email ? `*Email:* ${email}` : ''}

*Project Type:* ${projectType}
*Project Location:* ${location}
*Working On:* ${checkedItems}
*Project Stage:* ${stage}
*Preferred Material:* ${material}
${vision ? `*Vision:* ${vision}` : ''}
            `.trim();

            const encoded = encodeURIComponent(message);
            window.open(`https://wa.me/971502772659?text=${encoded}`, '_blank');
            form.reset();
            if (whatsappCodeSelect) whatsappCodeSelect.disabled = false;
            if (whatsappInput) whatsappInput.disabled = false;
        });
    }
})();