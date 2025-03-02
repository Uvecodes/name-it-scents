document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and brand sections
    const filterBtns = document.querySelectorAll('.filter-btn');
    const brandSections = document.querySelectorAll('.brand-section');

    // Add click event listeners to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Show/hide brand sections based on filter
            brandSections.forEach(section => {
                if (filter === 'all') {
                    section.style.display = 'block';
                } else {
                    if (section.id === filter) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                }
            });
        });
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.product-card .btn-primary');
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Add animation to the button
            btn.textContent = 'Added to Cart!';
            btn.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = 'var(--primary-color)';
            }, 2000);
        });
    });

    // Add smooth scroll animation for brand sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}); 