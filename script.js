// ===================================
// Mobile Navigation Toggle
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navIcons = document.querySelector('.nav-icons');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navIcons.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navIcons.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Contact Form Validation & Submission
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');
const submitBtn = document.querySelector('.btn-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!validateEmail(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formMessage.style.display = 'none';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success
            showFormMessage('Thank you for contacting us! We will get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 2000);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===================================
// Newsletter Form Submission
// ===================================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate newsletter subscription
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Product Quick View Modal
// ===================================
const quickViewButtons = document.querySelectorAll('.quick-view');

quickViewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const productPrice = productCard.querySelector('.price-current').textContent;
        const productImage = productCard.querySelector('.product-image img').src;
        
        // Create a simple alert for quick view (can be replaced with a modal)
        alert(`Quick View:\n\nProduct: ${productName}\nPrice: ${productPrice}\n\nClick "Buy Now" to purchase on Amazon.`);
    });
});

// ===================================
// Animate Elements on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate product cards
document.querySelectorAll('.product-card, .trending-card, .review-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// Add to Cart Animation (Placeholder)
// ===================================
const buyNowButtons = document.querySelectorAll('.btn-buy');

buyNowButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create a ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Search Functionality (Placeholder)
// ===================================
const searchIcon = document.querySelector('.nav-icon .fa-search');

if (searchIcon) {
    searchIcon.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create search input dynamically
        const existingSearch = document.querySelector('.search-overlay');
        
        if (existingSearch) {
            existingSearch.remove();
            return;
        }
        
        const searchOverlay = document.createElement('div');
        searchOverlay.className = 'search-overlay';
        searchOverlay.innerHTML = `
            <div class="search-container">
                <input type="text" placeholder="Search for shoes..." id="searchInput" autofocus>
                <button class="search-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        const searchStyles = document.createElement('style');
        searchStyles.textContent = `
            .search-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.95);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .search-container {
                width: 90%;
                max-width: 600px;
                position: relative;
            }
            
            .search-container input {
                width: 100%;
                padding: 1.5rem 2rem;
                font-size: 1.5rem;
                border: 2px solid var(--primary-color);
                border-radius: 12px;
                background-color: white;
                color: var(--black);
            }
            
            .search-container input:focus {
                outline: none;
            }
            
            .search-close {
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: var(--text-light);
                font-size: 1.5rem;
                cursor: pointer;
                transition: var(--transition);
            }
            
            .search-close:hover {
                color: var(--primary-color);
            }
            
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(searchStyles);
        document.body.appendChild(searchOverlay);
        
        const searchInput = document.getElementById('searchInput');
        const closeBtn = document.querySelector('.search-close');
        
        closeBtn.addEventListener('click', () => {
            searchOverlay.remove();
        });
        
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) {
                searchOverlay.remove();
            }
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim();
                if (searchTerm) {
                    alert(`Searching for: ${searchTerm}\n\nSearch functionality will filter products based on your query.`);
                    searchOverlay.remove();
                }
            }
        });
    });
}

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Log Analytics (Placeholder for tracking)
// ===================================
console.log('%c🎉 Welcome to MoveON!', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
console.log('%cPremium Footwear Collection', 'color: #0a0a0a; font-size: 14px;');
console.log('%cFounder & CEO: Aryan Yadav', 'color: #666; font-size: 12px;');
console.log('%cContact: +91 9236090361', 'color: #666; font-size: 12px;');

// ===================================
// Performance Optimization: Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Cart Count Update (Placeholder)
// ===================================
let cartCount = 0;

function updateCartCount() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        badge.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: bold;
        `;
        
        const existingBadge = document.querySelector('.cart-badge');
        if (existingBadge) {
            existingBadge.textContent = cartCount;
        } else if (cartCount > 0) {
            cartIcon.parentElement.style.position = 'relative';
            cartIcon.parentElement.appendChild(badge);
        }
    }
}

// Update cart count when clicking buy now buttons
buyNowButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        updateCartCount();
    });
});

// ===================================
// Price Filter Animation
// ===================================
const priceElements = document.querySelectorAll('.price-current');

priceElements.forEach(price => {
    const originalPrice = price.textContent;
    price.addEventListener('mouseenter', () => {
        price.style.transform = 'scale(1.1)';
        price.style.transition = 'transform 0.3s ease';
    });
    
    price.addEventListener('mouseleave', () => {
        price.style.transform = 'scale(1)';
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.querySelector('.footer-bottom p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
}

// ===================================
// Console Art
// ===================================
console.log(`
    ███╗   ███╗ ██████╗ ██╗   ██╗███████╗ ██████╗ ███╗   ██╗
    ████╗ ████║██╔═══██╗██║   ██║██╔════╝██╔═══██╗████╗  ██║
    ██╔████╔██║██║   ██║██║   ██║█████╗  ██║   ██║██╔██╗ ██║
    ██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██╔══╝  ██║   ██║██║╚██╗██║
    ██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ███████╗╚██████╔╝██║ ╚████║
    ╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝
    
    Premium Footwear Collection | Step Into Style
`);
