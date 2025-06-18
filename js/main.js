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

  // Virtual Hero Mobile Slideshow
  (function() {
    function isMobile() {
      return window.innerWidth <= 600;
    }

    const allImages = [
      'https://stemtutor.com.ng/wp-content/uploads/2025/01/15_20250110_134835_0013-min.png',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-10.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-9.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-4.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-3.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-12.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-14.jpg',
      'https://stemtutor.com.ng/wp-content/uploads/2025/04/Untitled-design-13.jpg'
    ];
    const allAlts = [
      'Virtual STEM 1',
      'Virtual STEM 2',
      'Virtual STEM 3',
      'Virtual STEM 4',
      'Virtual STEM 5',
      'Virtual STEM 6',
      'Virtual STEM 7',
      'Virtual STEM 8'
    ];

    let startIdx = 0;
    let intervalId = null;

    function renderMobileImages() {
      const container = document.querySelector('.virtual-hero-images-mobile');
      if (!container) return;
      container.innerHTML = '';
      for (let i = 0; i < 4; i++) {
        const idx = (startIdx + i) % allImages.length;
        const img = document.createElement('img');
        img.src = allImages[idx];
        img.alt = allAlts[idx];
        container.appendChild(img);
      }
    }

    function animateAndAdvance() {
      const container = document.querySelector('.virtual-hero-images-mobile');
      if (!container) return;
      const imgs = container.querySelectorAll('img');
      if (imgs.length < 4) return;
      // Step 1: Add slide-out to the first image
      imgs[0].classList.add('slide-out');
      // Step 2: After animation, remove first image, add new image at end with slide-in
      setTimeout(() => {
        // Remove the first image
        if (container.firstChild) container.removeChild(container.firstChild);
        // Advance the index
        startIdx = (startIdx + 1) % allImages.length;
        // Add new image at the end
        const newIdx = (startIdx + 3) % allImages.length;
        const newImg = document.createElement('img');
        newImg.src = allImages[newIdx];
        newImg.alt = allAlts[newIdx];
        newImg.classList.add('slide-in');
        container.appendChild(newImg);
        // Remove slide-in class after animation
        setTimeout(() => {
          newImg.classList.remove('slide-in');
        }, 500);
      }, 500); // match CSS transition duration
    }

    function startAutoSlideshow() {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(animateAndAdvance, 3000);
    }

    function stopAutoSlideshow() {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    }

    function showMobileSlideshow() {
      document.querySelector('.virtual-hero-images').style.display = 'none';
      document.querySelector('.virtual-hero-images-mobile-nav').style.display = 'flex';
      renderMobileImages();
      startAutoSlideshow();
    }

    function hideMobileSlideshow() {
      document.querySelector('.virtual-hero-images').style.display = '';
      document.querySelector('.virtual-hero-images-mobile-nav').style.display = 'none';
      stopAutoSlideshow();
    }

    function updateSlideshow() {
      if (isMobile()) {
        showMobileSlideshow();
      } else {
        hideMobileSlideshow();
      }
    }

    window.addEventListener('resize', updateSlideshow);
    document.addEventListener('DOMContentLoaded', function() {
      updateSlideshow();
    });
  })();
});
