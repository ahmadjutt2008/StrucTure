document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // AOS Initialization Placeholder
    // In a real project we'd use AOS.init()
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');

                // Check if element itself is a counter
                if (entry.target.dataset.target) {
                    startCounter(entry.target);
                }

                // Check if any children are counters
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => startCounter(counter));

                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Stats Counter Logic
    function startCounter(el) {
        const target = parseInt(el.dataset.target);
        let count = 0;
        const speed = 2000 / target;

        const updateCount = () => {
            count += Math.ceil(target / 100);
            if (count < target) {
                el.innerText = count + '+';
                setTimeout(updateCount, speed);
            } else {
                el.innerText = target + '+';
            }
        };
        updateCount();
    }
});
