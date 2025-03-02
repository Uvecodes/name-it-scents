document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return;
    }

    // Parse user data and update profile
    const user = JSON.parse(userData);
    const profileName = document.querySelector('.profile-name');
    const profileEmail = document.querySelector('.profile-email');
    const profileMemberSince = document.querySelector('.profile-member-since');
    
    if (profileEmail) profileEmail.textContent = user.email;
    if (profileMemberSince) {
        const memberDate = user.registrationDate ? new Date(user.registrationDate) : new Date(user.loginTime);
        profileMemberSince.textContent = `Member since: ${memberDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
    }
    if (profileName && user.firstName) {
        profileName.textContent = `${user.firstName} ${user.lastName || ''}`;
    }

    // Add logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn-danger logout-btn';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    logoutBtn.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        background-color: #dc3545;
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        font-size: 1rem;
    `;
    
    logoutBtn.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(220, 53, 69, 0.2)';
        this.style.backgroundColor = '#c82333';
    });
    
    logoutBtn.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        this.style.backgroundColor = '#dc3545';
    });

    logoutBtn.addEventListener('click', function() {
        // Show confirmation message
        showMessage('Logging out...', 'success');
        // Clear user data
        localStorage.removeItem('userData');
        localStorage.removeItem('profilePicture');
        localStorage.removeItem('coverPhoto');
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    });

    document.body.appendChild(logoutBtn);

    // Profile Navigation
    const navBtns = document.querySelectorAll('.profile-nav-btn');
    const sections = document.querySelectorAll('.profile-section-content');
    const avatarInput = document.getElementById('avatarInput');
    const profilePic = document.getElementById('profilePic');
    const coverInput = document.getElementById('coverInput');
    const profileCover = document.getElementById('profileCover');

    // Load saved images on page load
    loadSavedImages();

    function loadSavedImages() {
        // Load profile picture
        const savedProfilePic = localStorage.getItem('profilePicture');
        if (savedProfilePic) {
            profilePic.src = savedProfilePic;
        }

        // Load cover photo
        const savedCoverPhoto = localStorage.getItem('coverPhoto');
        if (savedCoverPhoto) {
            profileCover.style.backgroundImage = `url(${savedCoverPhoto})`;
        }
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const sectionId = btn.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Handle profile picture upload
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                profilePic.src = imageData;
                // Save to localStorage
                localStorage.setItem('profilePicture', imageData);
                showMessage('Profile picture updated and saved successfully!', 'success');
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle cover photo upload
    coverInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                profileCover.style.backgroundImage = `url(${imageData})`;
                // Save to localStorage
                localStorage.setItem('coverPhoto', imageData);
                showMessage('Cover photo updated and saved successfully!', 'success');
            }
            reader.readAsDataURL(file);
        }
    });

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

    // Settings Form Submission
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add success message
            showMessage('Settings updated successfully!', 'success');
        });
    }

    // Coupon Button Click Handler
    const couponBtns = document.querySelectorAll('.coupon-card .btn');
    couponBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const couponCode = this.closest('.coupon-card').querySelector('.coupon-code').textContent;
            
            // Copy coupon code to clipboard
            navigator.clipboard.writeText(couponCode).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.style.backgroundColor = 'var(--success-color)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                }, 2000);
            });
        });
    });

    // Purchase History Buttons
    const buyAgainBtns = document.querySelectorAll('.purchase-item .btn-primary');
    buyAgainBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Added to Cart!';
            this.style.backgroundColor = 'var(--success-color)';
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });

    // Track Order Button
    const trackBtns = document.querySelectorAll('.btn-secondary');
    trackBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Show tracking modal or redirect to tracking page
            alert('Tracking information will be displayed here');
        });
    });
}); 