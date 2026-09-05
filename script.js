document.addEventListener('DOMContentLoaded', () => {
    // 1. Carousel Logic
    const track = document.getElementById('videoCarousel');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (track && prevBtn && nextBtn) {
        const scrollAmount = track.clientWidth;

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        // Optional: Update button visibility based on scroll position
        track.addEventListener('scroll', () => {
            if (track.scrollLeft <= 0) {
                prevBtn.style.opacity = '0.5';
                prevBtn.style.cursor = 'default';
            } else {
                prevBtn.style.opacity = '1';
                prevBtn.style.cursor = 'pointer';
            }
            
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 5) {
                nextBtn.style.opacity = '0.5';
                nextBtn.style.cursor = 'default';
            } else {
                nextBtn.style.opacity = '1';
                nextBtn.style.cursor = 'pointer';
            }
        });
        
        // Trigger initial state
        track.dispatchEvent(new Event('scroll'));
    }

    // 2. Mobile Sticky CTA Logic
    const stickyCta = document.getElementById('stickyCta');
    const heroSection = document.querySelector('.hero');
    const finalCtaSection = document.getElementById('participar');

    if (stickyCta && heroSection && finalCtaSection) {
        const handleScroll = () => {
            if (window.innerWidth <= 768) {
                const scrollPos = window.scrollY;
                const heroBottom = heroSection.offsetHeight - 100;
                const finalCtaTop = finalCtaSection.offsetTop - window.innerHeight;

                if (scrollPos > heroBottom && scrollPos < finalCtaTop) {
                    stickyCta.classList.add('show');
                } else {
                    stickyCta.classList.remove('show');
                }
            }
        };

        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });

        handleScroll();
        window.addEventListener('resize', handleScroll);
    }
});
