document.addEventListener('DOMContentLoaded', function() {
    // Get the login and signup forms
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            // Validate form data
            if (!email || !password) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Store user data in localStorage
            const userData = {
                email: email,
                isLoggedIn: true,
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message and redirect
            showMessage('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const termsCheckbox = document.querySelector('input[name="terms"]');
            
            // Validate form data
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showMessage('Please fill in all fields', 'error');
                return;
            }

            // Email validation
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }

            // Password validation
            if (password.length < 8) {
                showMessage('Password must be at least 8 characters long', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showMessage('Passwords do not match', 'error');
                return;
            }

            // Terms checkbox validation
            if (!termsCheckbox.checked) {
                showMessage('Please accept the Terms & Conditions', 'error');
                return;
            }

            // Store user data in localStorage
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                isLoggedIn: true,
                registrationDate: new Date().toISOString(),
                loginTime: new Date().toISOString()
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Show success message and redirect
            showMessage('Account created successfully! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1500);
        });
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Message display function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            messageDiv.style.backgroundColor = 'var(--success-color)';
        } else {
            messageDiv.style.backgroundColor = 'var(--danger-color)';
        }

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }
}); 