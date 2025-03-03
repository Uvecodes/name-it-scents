// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const cartIcon = document.getElementById('cartIcon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const testimonialCarousel = document.getElementById('testimonialCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselDots = document.querySelectorAll('.carousel-dot');

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cart Functionality
let cart = [];

cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeItem(${index})">×</button>
        `;
        cartItems.appendChild(itemElement);
    });

    cartTotal.textContent = total.toFixed(2);
    document.querySelector('.cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateQuantity(index, change) {
    cart[index].quantity = Math.max(0, cart[index].quantity + change);
    if (cart[index].quantity === 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Product Grid
/* Commenting out dynamic product loading
const products = [
    {
        id: 1,
        name: "Signature Perfume",
        price: 89.99,
        image: "images/product1.jpg",
        description: "A luxurious fragrance with notes of jasmine and vanilla"
    },
    {
        id: 2,
        name: "Designer T-Shirt",
        price: 29.99,
        image: "images/product2.jpg",
        description: "Premium cotton t-shirt with unique design"
    },
    // Add more products as needed
];

function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-4';
        productCard.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}
*/

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    cartSidebar.classList.add('active');
}

// Testimonial Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    carouselDots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-advance carousel
setInterval(() => showSlide(currentSlide + 1), 5000);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Commenting out dynamic product loading
    // loadProducts();
    updateCart();
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotContainer = document.querySelector('.chatbot-container');
const closeChat = document.querySelector('.close-chat');
const chatMessages = document.querySelector('.chatbot-messages');
const chatInput = document.querySelector('.chatbot-input input');
const chatSendBtn = document.querySelector('.chatbot-input button');

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        chatInput.focus();
        if (chatMessages.children.length === 0) {
            // Add welcome message
            appendMessage('bot', 'Hello! How can I help you today?');
        }
    }
});

// Close chatbot
closeChat.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Send message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        appendMessage('user', message);
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const response = getBotResponse(message);
            appendMessage('bot', response);
        }, 500);
    }
}

// Handle send button click
chatSendBtn.addEventListener('click', sendMessage);

// Handle enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Append message to chat
function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Bot responses
function getBotResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
        return "Hello! How can I assist you today?";
    } else if (message.includes('shipping') || message.includes('delivery')) {
        return "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days.";
    } else if (message.includes('return') || message.includes('refund')) {
        return "Our return policy allows returns within 30 days of purchase. Please keep the original packaging.";
    } else if (message.includes('payment') || message.includes('pay')) {
        return "We accept all major credit cards, PayPal, and Apple Pay.";
    } else if (message.includes('product') || message.includes('item')) {
        return "Our products are carefully curated to ensure the highest quality. Is there a specific item you're interested in?";
    } else if (message.includes('contact') || message.includes('support')) {
        return "You can reach our customer support team at support@nameit.com or call us at 1-800-NAMEIT.";
    } else if (message.includes('price') || message.includes('cost')) {
        return "Our prices vary by product. Is there a specific item you'd like to know the price of?";
    } else if (message.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
    } else {
        return "I'm not sure I understand. Could you please rephrase your question? Or you can contact our customer support for more detailed assistance.";
    }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('shadow-sm');
    } else {
        document.querySelector('.navbar').classList.remove('shadow-sm');
    }
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        const formData = new FormData(form);

        // Basic validation
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                const input = form.querySelector(`[name="${key}"]`);
                showError(input, 'This field is required');
            }
        }

        // Password validation for signup form
        if (formId === 'signupForm') {
            const password = formData.get('password');
            const confirmPassword = formData.get('confirmPassword');

            if (password && password.length < 8) {
                isValid = false;
                showError(form.querySelector('[name="password"]'), 'Password must be at least 8 characters long');
            }

            if (password !== confirmPassword) {
                isValid = false;
                showError(form.querySelector('[name="confirmPassword"]'), 'Passwords do not match');
            }
        }

        // Email validation
        const email = formData.get('email');
        if (email && !isValidEmail(email)) {
            isValid = false;
            showError(form.querySelector('[name="email"]'), 'Please enter a valid email address');
        }

        if (isValid) {
            // Simulate form submission
            showSuccess(form);
        }
    });

    // Clear error on input
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
}

function showError(input, message) {
    clearError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
    input.classList.add('error');
}

function clearError(input) {
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

function showSuccess(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = 'Form submitted successfully!';
    form.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
        form.reset();
    }, 3000);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password Toggle
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', () => {
            const input = button.parentNode.querySelector('input');
            const icon = button.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Initialize forms
document.addEventListener('DOMContentLoaded', () => {
    // Initialize existing functionality
    // loadProducts();
    updateCart();

    // Initialize new functionality
    validateForm('loginForm');
    validateForm('signupForm');
    validateForm('contactForm');
    initPasswordToggles();
});

// Team Carousel
const teamCarouselRow = document.querySelector('.team-row');
const teamPrevBtn = document.querySelector('.prev-btn');
const teamNextBtn = document.querySelector('.next-btn');
const teamDots = document.querySelectorAll('.team-dot');
let teamCurrentSlide = 0;

function updateTeamCarousel() {
    const slideWidth = 100 / 3;
    teamCarouselRow.style.transform = `translateX(-${teamCurrentSlide * slideWidth}%)`;
    
    // Update dots
    teamDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === teamCurrentSlide);
    });
}

teamPrevBtn.addEventListener('click', () => {
    teamCurrentSlide = (teamCurrentSlide - 1 + 3) % 3;
    updateTeamCarousel();
});

teamNextBtn.addEventListener('click', () => {
    teamCurrentSlide = (teamCurrentSlide + 1) % 3;
    updateTeamCarousel();
});

teamDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        teamCurrentSlide = index;
        updateTeamCarousel();
    });
});

// Auto slide every 5 seconds
setInterval(() => {
    teamCurrentSlide = (teamCurrentSlide + 1) % 3;
    updateTeamCarousel();
}, 5000); 