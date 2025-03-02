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
        
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! How can I assist you today?";
        }
        else if (message.includes('perfume') || message.includes('fragrance')) {
            return "We have a wide selection of premium fragrances. Would you like to browse our collection?";
        }
        else if (message.includes('clothing') || message.includes('clothes')) {
            return "Check out our latest clothing collection in the catalogue section!";
        }
        else if (message.includes('price') || message.includes('cost')) {
            return "Our prices vary depending on the product. You can find detailed pricing information on each product page.";
        }
        else if (message.includes('delivery') || message.includes('shipping')) {
            return "We offer worldwide shipping. Standard delivery takes 3-5 business days, and express delivery takes 1-2 business days.";
        }
        else if (message.includes('return') || message.includes('refund')) {
            return "We have a 30-day return policy for all unused items in their original packaging.";
        }
        else if (message.includes('contact') || message.includes('support')) {
            return "You can reach our customer support team at support@nameit.com or call us at +1 (555) 123-4567.";
        }
        else if (message.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        else {
            return "I'm not sure I understand. Could you please rephrase that or ask about our products, shipping, returns, or contact information?";
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