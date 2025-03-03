document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot HTML structure
    const chatbotHTML = `
        <div class="chatbot">
            <button class="chatbot-toggle">
                <i class="fas fa-comments"></i>
                <span class="chatbot-notification"></span>
            </button>
            <div class="chatbot-container">
                <div class="chatbot-header">
                    <h3>Customer Support</h3>
                    <button class="chatbot-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="chatbot-messages">
                    <div class="message bot-message">
                        <i class="fas fa-robot"></i>
                        <div class="message-content">
                            Hello! 👋 How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="chatbot-input">
                    <input type="text" placeholder="Type your message..." id="chatInput">
                    <button class="send-button">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add chatbot to the page
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    // Get DOM elements
    const chatbot = document.querySelector('.chatbot');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.querySelector('.send-button');

    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.classList.toggle('active');
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
        chatbotToggle.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage('user', message);
        chatInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage('bot', botResponse);
        }, 1000);
    }

    // Add message to chat
    function addMessage(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const icon = document.createElement('i');
        icon.className = type === 'user' ? 'fas fa-user' : 'fas fa-robot';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = message;

        messageDiv.appendChild(icon);
        messageDiv.appendChild(content);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! 👋 I'm your shopping assistant. How can I help you today?";
        }
        
        // Product Information
        else if (message.includes('perfume') || message.includes('fragrance')) {
            return "We have a wide selection of premium fragrances from top brands. Our collection includes:\n- Designer perfumes\n- Natural fragrances\n- Unisex scents\n\nWould you like to browse our collection or know more about a specific fragrance?";
        }
        else if (message.includes('clothing') || message.includes('clothes') || message.includes('fashion')) {
            return "Our clothing collection features:\n- Trendy apparel\n- Accessories\n- Seasonal collections\n\nCheck out our latest arrivals in the catalogue section!";
        }
        
        // Pricing and Payment
        else if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
            return "Our prices vary depending on the product category:\n- Perfumes: $30-$200\n- Clothing: $20-$150\n- Accessories: $10-$100\n\nWe also offer regular discounts and special deals. Would you like to know about our current promotions?";
        }
        else if (message.includes('payment') || message.includes('pay') || message.includes('card')) {
            return "We accept multiple payment methods:\n- Credit/Debit Cards (Visa, MasterCard, American Express)\n- PayPal\n- Apple Pay\n- Google Pay\n\nAll transactions are secure and encrypted.";
        }
        
        // Shipping and Delivery
        else if (message.includes('delivery') || message.includes('shipping') || message.includes('ship')) {
            return "We offer various shipping options:\n- Free shipping on orders over $50\n- Standard delivery (3-5 business days)\n- Express delivery (1-2 business days)\n- International shipping available\n\nWould you like to know the shipping cost for your location?";
        }
        
        // Returns and Refunds
        else if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
            return "Our return policy includes:\n- 30-day return window\n- Free returns for defective items\n- Items must be unused and in original packaging\n- Refund processed within 5-7 business days\n\nWould you like to start a return?";
        }
        
        // Order Status and Tracking
        else if (message.includes('order') || message.includes('track') || message.includes('status')) {
            return "To check your order status:\n1. Log in to your account\n2. Go to 'My Orders'\n3. Click on the order number\n\nYou can also track your shipment using the tracking number provided in your order confirmation email.";
        }
        
        // Size and Fit
        else if (message.includes('size') || message.includes('fit') || message.includes('measurement')) {
            return "We provide detailed size guides for all clothing items. You can find:\n- Size charts\n- Measurement instructions\n- Fit recommendations\n\nWould you like to see the size guide for a specific item?";
        }
        
        // Product Availability
        else if (message.includes('stock') || message.includes('available') || message.includes('out of stock')) {
            return "Our inventory is updated in real-time. If an item is out of stock:\n- You can sign up for restock notifications\n- We can suggest similar alternatives\n- You can check back in a few days\n\nWould you like to be notified when a specific item is back in stock?";
        }
        
        // Customer Support
        else if (message.includes('contact') || message.includes('support') || message.includes('help')) {
            return "You can reach our customer support team through:\n- Email: support@nameit.com\n- Phone: +1 (555) 123-4567\n- Live chat (available 24/7)\n\nWhat's the best way to contact you?";
        }
        
        // Discounts and Promotions
        else if (message.includes('discount') || message.includes('sale') || message.includes('promo')) {
            return "We offer various ways to save:\n- Seasonal sales\n- Newsletter subscriber discounts\n- First-time customer offers\n- Bundle deals\n\nWould you like to sign up for our newsletter to receive exclusive offers?";
        }
        
        // Gift Cards
        else if (message.includes('gift') || message.includes('present') || message.includes('card')) {
            return "Our gift cards are perfect for any occasion:\n- Available in denominations from $25-$500\n- Can be sent digitally or physically\n- Never expire\n- Can be used for any product\n\nWould you like to purchase a gift card?";
        }
        
        // Thank you messages
        else if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! 😊 Is there anything else I can help you with?";
        }
        
        // Default response
        else {
            return "I'm not sure I understand. Could you please rephrase that? I can help you with:\n- Product information\n- Pricing and payment\n- Shipping and delivery\n- Returns and refunds\n- Order tracking\n- Size guides\n- Customer support";
        }
    }

    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Show notification after 3 seconds
    setTimeout(() => {
        const notification = document.querySelector('.chatbot-notification');
        notification.textContent = '1';
        notification.classList.add('active');
    }, 3000);
}); 