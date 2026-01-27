// Scroll-triggered animations
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    }
);
animatedElements.forEach(el => observer.observe(el));

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('text-yellow-400'));
            if (link) link.classList.add('text-yellow-400');
        }
    });
}, { threshold: 0.5 });
sections.forEach(section => navObserver.observe(section));

// Current day highlighting
const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
  
const today = dayNames[new Date().getDay()];
const rows = document.querySelectorAll(".hours-row");
  
rows.forEach((row) => {
    const dayText = row.querySelector("span").textContent.trim();
  
    if (dayText === today) {
        row.classList.add(
            "text-red-900",
            "font-semibold",
            "bg-red-100",
            "px-3",
            "py-1",
            "rounded-md"
        );
    }
});

// Background image carousel
document.querySelectorAll(".bg-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".bg-track");
    const slides = Array.from(track.children);

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);

    firstClone.classList.add("clone");
    lastClone.classList.add("clone");

    track.appendChild(firstClone);
    track.insertBefore(lastClone, slides[0]);

    const allSlides = track.children;
    let index = 1;
    let isTransitioning = false;

    const slideWidth = window.innerWidth;

    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth * index}px)`;

    requestAnimationFrame(() => {
        track.style.transition = "transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1)";
    });

    const moveTo = () => {
        isTransitioning = true;
        track.style.transition = "transform 1.1s cubic-bezier(0.22, 0.61, 0.36, 1)";
        track.style.transform = `translateX(-${slideWidth * index}px)`;
    };

    const jumpWithoutAnimation = () => {
        track.style.transition = "none";
        track.style.transform = `translateX(-${slideWidth * index}px)`;
    };

    carousel.closest("section").querySelectorAll(".carousel-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (isTransitioning) return;
            index += Number(btn.dataset.dir);
            moveTo();
        });
    });

    track.addEventListener("transitionend", () => {
        isTransitioning = false;

        if (allSlides[index].classList.contains("clone")) {
            index = index === 0 ? slides.length : 1;
            jumpWithoutAnimation();
        }
    });

    window.addEventListener("resize", () => {
        jumpWithoutAnimation();
    });
});

// Centre viewport on contact and opening hours
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        const targetRect = target.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;

        const targetCenter = scrollTop + targetRect.top - (window.innerHeight / 2) + (targetRect.height / 2);

        window.scrollTo({
            top: targetCenter,
            behavior: 'smooth'
        });
    });
});