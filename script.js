// ─── Formspree Configuration ──────────────────────────────────────────────
const FORMSPREE_URL = 'https://formspree.io/f/mpqnagqw';
// ──────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // ── Navbar Scroll Effect ──────────────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ── Mobile Hamburger Menu ─────────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });

    // ── Initial Load Animation ────────────────────────────────────────────
    setTimeout(() => {
        document.querySelectorAll('.reveal-on-load').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // ── Scroll Reveal ─────────────────────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ── Stay in Touch Form → EmailJS ──────────────────────────────────────
    const sitForm   = document.getElementById('stayInTouchForm');
    const sitBtn    = document.getElementById('sitSubmitBtn');
    const sitStatus = document.getElementById('sitStatus');

    sitForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name  = document.getElementById('sit-name').value.trim();
        const phone = document.getElementById('sit-phone').value.trim();
        const plan  = document.getElementById('sit-plan').value;

        sitBtn.textContent = 'Sending...';
        sitBtn.disabled = true;
        sitStatus.textContent = '';
        sitStatus.className = 'sit-note';

        fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, phone, plan })
        })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    sitBtn.textContent = 'Message Sent!';
                    sitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    sitStatus.textContent = 'CA Parmod Sharma will call you back shortly.';
                    sitStatus.classList.add('success');
                    sitForm.reset();
                    setTimeout(() => {
                        sitBtn.textContent = 'Send Message';
                        sitBtn.style.background = '';
                        sitBtn.disabled = false;
                        sitStatus.textContent = '';
                        sitStatus.className = 'sit-note';
                    }, 4000);
                } else {
                    throw new Error('Formspree rejected');
                }
            })
            .catch(() => {
                sitBtn.textContent = 'Send Message';
                sitBtn.disabled = false;
                sitStatus.textContent = 'Failed to send. Please call 9643581048 directly.';
                sitStatus.classList.add('error');
            });
    });
});
