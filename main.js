// Initialise swiper
if (window.innerWidth <= 768) {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true, // infinite loop
        autoplay: {
            delay: 5000, 
            disableOnInteraction: false, // continue autoplay after manual swipe
        }
    });
} else {
    const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true, // infinite loop
        autoplay: {
            delay: 5000, 
            disableOnInteraction: false, // continue autoplay after manual swipe
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
}


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

// Get current year for footer
document.getElementById('current-year').textContent = new Date().getFullYear();
