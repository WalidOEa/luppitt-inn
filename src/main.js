const animatedElements = document.querySelectorAll('[data-animate="slide-in"]');

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
        threshold: 0.5,
    }
);

animatedElements.forEach(el => observer.observe(el));