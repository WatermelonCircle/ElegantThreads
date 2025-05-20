// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const dots = document.querySelectorAll('.testimonial-dots .dot');
const testimonials = document.querySelectorAll('.testimonial');
const navbar = document.querySelector('.navbar');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Testimonial Slider
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Remove active class from all dots and testimonials
        dots.forEach(d => d.classList.remove('active'));
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Add active class to current dot and show corresponding testimonial
        dot.classList.add('active');
        testimonials[index].style.display = 'block';
    });
});

// Show only the first testimonial initially
testimonials.forEach((testimonial, index) => {
    if (index !== 0) {
        testimonial.style.display = 'none';
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.7rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, just show a success message
        alert('Thank you for your request! We will contact you shortly.');
        this.reset();
    });
}

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section-header, .about-content, .service-card, .gallery-container, .testimonial, .contact-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles for animation
document.querySelectorAll('.section-header, .about-content, .service-card, .gallery-container, .testimonial, .contact-content').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Call the animation function on scroll
window.addEventListener('scroll', animateOnScroll);
// Call once on load to animate elements already visible
window.addEventListener('load', animateOnScroll);

// Portfolio Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');
    const indicators = Array.from(document.querySelectorAll('.indicator'));
    const categoryIndicator = document.querySelector('.carousel-category-indicator');
    
    if (!track || !slides.length || !nextButton || !prevButton) return;
    
    // Handle image loading errors
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach(img => {
        img.addEventListener('error', function() {
            // Add a class to the parent slide for styling
            this.parentElement.classList.add('image-error');
            
            // Create a fallback element
            const fallback = document.createElement('div');
            fallback.className = 'image-fallback';
            fallback.innerHTML = `
                <i class="fas fa-image"></i>
                <p>Image Not Available</p>
                <small>${this.src.split('/').pop()}</small>
            `;
            
            // Replace the broken image with the fallback
            this.style.display = 'none';
            this.parentElement.insertBefore(fallback, this.nextSibling);
            
            console.log('Image failed to load:', this.src);
        });
    });
    
    let currentIndex = 0;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Position slides
    function positionSlides() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - currentIndex)}%)`;
        });
    }
    
    // Function to move to a specific slide
    const moveToSlide = (index) => {
        // Ensure index is within bounds
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentIndex = index;
        positionSlides();
        
        // Update active indicator
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
        
        // Update category indicator
        if (categoryIndicator) {
            const currentCategory = slides[currentIndex].getAttribute('data-category');
            categoryIndicator.textContent = currentCategory;
        }
    };
    
    // Next button click
    nextButton.addEventListener('click', () => {
        moveToSlide(currentIndex + 1);
    });
    
    // Previous button click
    prevButton.addEventListener('click', () => {
        moveToSlide(currentIndex - 1);
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Only respond to keyboard if carousel is in viewport
        const rect = track.getBoundingClientRect();
        const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                moveToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight') {
                moveToSlide(currentIndex + 1);
            }
        }
    });
    
    // Auto rotation
    let carouselInterval = setInterval(() => {
        moveToSlide(currentIndex + 1);
    }, 5000);
    
    // Pause auto rotation on hover
    const carouselContainer = document.querySelector('.portfolio-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 5000);
    });
    
    // Touch swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        // Left swipe
        if (touchEndX < touchStartX - 50) {
            moveToSlide(currentIndex + 1);
        }
        // Right swipe
        if (touchEndX > touchStartX + 50) {
            moveToSlide(currentIndex - 1);
        }
    };
    
    // Initialize first slide
    positionSlides();
    moveToSlide(0);
    
    // Recalculate on window resize
    window.addEventListener('resize', () => {
        positionSlides();
    });
}); 