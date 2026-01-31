// Slider functionality
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;
        let autoPlayInterval;

        function showSlide(index) {
            // Pause all videos
            slides.forEach(slide => {
                const video = slide.querySelector('video');
                if (video) video.pause();
            });

            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Ensure index is within bounds
            if (index >= totalSlides) currentSlide = 0;
            if (index < 0) currentSlide = totalSlides - 1;

            // Add active classes
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            // Play current video
            const currentVideo = slides[currentSlide].querySelector('video');
            if (currentVideo) currentVideo.play();

            // Reset auto-play timer
            resetAutoPlay();
        }

        function nextSlide() {
            currentSlide++;
            if (currentSlide >= totalSlides) currentSlide = 0;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide--;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            showSlide(currentSlide);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Event listeners for arrows
        document.querySelector('.slider-arrow.next').addEventListener('click', nextSlide);
        document.querySelector('.slider-arrow.prev').addEventListener('click', prevSlide);

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Start auto-play on page load
        startAutoPlay();

        // Play first video on load
        const firstVideo = slides[0].querySelector('video');
        if (firstVideo) firstVideo.play();

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.padding = '0.8rem 0';
            } else {
                header.style.padding = '1.5rem 0';
            }
        });

        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });