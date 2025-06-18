document.addEventListener('DOMContentLoaded', function() {
  // Hero Slideshow
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds total (3s zoom + 2s fade)

  // Only initialize slideshow if elements exist
  if (slides.length > 0 && dots.length > 0) {
    function nextSlide() {
      // Add fade-out class to current slide
      slides[currentSlide].classList.add('fade-out');
      dots[currentSlide].classList.remove('active');
      
      // Wait for fade-out animation to complete
      setTimeout(() => {
        // Remove active and fade-out classes from current slide
        slides[currentSlide].classList.remove('active', 'fade-out');
        slides[currentSlide].style.transform = 'scale(1)';
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }, 1500); // Match the CSS transition duration
    }

    // Initialize first slide
    slides[0].classList.add('active');
    dots[0].classList.add('active');

    // Auto slideshow
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Click handlers for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideTimer);
        
        // Add fade-out class to current slide
        slides[currentSlide].classList.add('fade-out');
        dots[currentSlide].classList.remove('active');
        
        // Wait for fade-out animation to complete
        setTimeout(() => {
          // Remove active and fade-out classes from current slide
          slides[currentSlide].classList.remove('active', 'fade-out');
          slides[currentSlide].style.transform = 'scale(1)';
          
          // Update current slide
          currentSlide = index;
          
          // Add active class to new slide and dot
          slides[currentSlide].classList.add('active');
          dots[currentSlide].classList.add('active');
          
          // Restart timer
          slideTimer = setInterval(nextSlide, slideInterval);
        }, 1500); // Match the CSS transition duration
      });
    });

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
      });
      
      heroSection.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
      });
    }
  }

  // Mobile Navigation
  const hamburger = document.querySelector('.navbar-hamburger');
  const navLinks = document.querySelector('.navbar-links');
  const navbar = document.querySelector('.navbar');

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
      const expanded = navLinks.classList.contains('open');
      hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navbar.contains(event.target);
      
      if (!isClickInside && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth > 600 && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle escape key to close menu
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
