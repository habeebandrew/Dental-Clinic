// Main JavaScript file for Dr.J Dental Clinic

let currentLanguage = 'ar';

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Initialize all page functionality
function initializePage() {
    // Load saved language preference first
    loadLanguagePreference();
    
    // Set minimum date for booking forms
    setMinimumDate();
    
    // Optimize images
    optimizeImages();
    
    // Handle clicks outside mobile menu to close it
    handleMobileMenuClicks();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Set up intersection observer for animations
    setupIntersectionObserver();
}

// Load language preference from localStorage
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('drj-clinic-language');
    
    if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
        
        // Apply the saved language immediately
        applyLanguageSettings(currentLanguage);
        
        // Update content
        updateContent(currentLanguage);
    } else {
        // Default to Arabic if no preference is saved
        currentLanguage = 'ar';
        localStorage.setItem('drj-clinic-language', 'ar');
    }
}

// Apply language settings to HTML and UI
function applyLanguageSettings(lang) {
    const html = document.documentElement;
    const langButton = document.querySelector('.lang-toggle');
    
    if (lang === 'ar') {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        if (langButton) langButton.textContent = 'EN';
    } else {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        if (langButton) langButton.textContent = 'العربية';
    }
}

// Save language preference to localStorage
function saveLanguagePreference(lang) {
    localStorage.setItem('drj-clinic-language', lang);
}

// Navigation functions
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Language toggle function
function toggleLanguage() {
    if (currentLanguage === 'ar') {
        // Switch to English
        currentLanguage = 'en';
        applyLanguageSettings('en');
        updateContent('en');
        saveLanguagePreference('en');
    } else {
        // Switch to Arabic
        currentLanguage = 'ar';
        applyLanguageSettings('ar');
        updateContent('ar');
        saveLanguagePreference('ar');
    }
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
    
    // Trigger a custom event for other components that might need to know about language change
    const languageChangeEvent = new CustomEvent('languageChanged', {
        detail: { language: currentLanguage }
    });
    document.dispatchEvent(languageChangeEvent);
}

// Update content based on language
function updateContent(lang) {
    // Update text content
    const elements = document.querySelectorAll('[data-ar][data-en]');
    elements.forEach(element => {
        let arText = element.getAttribute('data-ar');
        let enText = element.getAttribute('data-en');

            if (lang === 'ar') {
                element.textContent = arText;
            } else {
                element.textContent = enText;
            }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-ar-placeholder][data-en-placeholder]');
    placeholderElements.forEach(element => {
        if (lang === 'ar') {
            element.setAttribute('placeholder', element.getAttribute('data-ar-placeholder'));
        } else {
            element.setAttribute('placeholder', element.getAttribute('data-en-placeholder'));
        }
    });
    
    // Update select options
    const selectOptions = document.querySelectorAll('option[data-ar][data-en]');
    selectOptions.forEach(option => {
        if (lang === 'ar') {
            option.textContent = option.getAttribute('data-ar');
        } else {
            option.textContent = option.getAttribute('data-en');
        }
    });
    
    // Update image alt attributes
    const images = document.querySelectorAll('img[data-ar-alt][data-en-alt]');
    images.forEach(img => {
        if (lang === 'ar') {
            img.setAttribute('alt', img.getAttribute('data-ar-alt'));
        } else {
            img.setAttribute('alt', img.getAttribute('data-en-alt'));
        }
    });
    
    // Update image placeholders
    const imagePlaceholders = document.querySelectorAll('.image-placeholder span[data-ar][data-en]');
    imagePlaceholders.forEach(placeholder => {
        if (lang === 'ar') {
            placeholder.textContent = placeholder.getAttribute('data-ar');
        } else {
            placeholder.textContent = placeholder.getAttribute('data-en');
        }
    });
    
    // Update page title if it has language attributes
    const titleElement = document.querySelector('title');
    if (titleElement && titleElement.hasAttribute('data-ar') && titleElement.hasAttribute('data-en')) {
        if (lang === 'ar') {
            titleElement.textContent = titleElement.getAttribute('data-ar');
        } else {
            titleElement.textContent = titleElement.getAttribute('data-en');
        }
    }
    
    // Update meta description if it has language attributes
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.hasAttribute('data-ar') && metaDescription.hasAttribute('data-en')) {
        if (lang === 'ar') {
            metaDescription.setAttribute('content', metaDescription.getAttribute('data-ar'));
        } else {
            metaDescription.setAttribute('content', metaDescription.getAttribute('data-en'));
        }
    }
    
    // Update any elements with innerHTML that contain language-specific content
    const htmlElements = document.querySelectorAll('[data-ar-html][data-en-html]');
    htmlElements.forEach(element => {
        if (lang === 'ar') {
            element.innerHTML = element.getAttribute('data-ar-html');
        } else {
            element.innerHTML = element.getAttribute('data-en-html');
        }
    });
    
    // Update form labels and buttons
    const labels = document.querySelectorAll('label[data-ar][data-en]');
    labels.forEach(label => {
        if (lang === 'ar') {
            label.textContent = label.getAttribute('data-ar');
        } else {
            label.textContent = label.getAttribute('data-en');
        }
    });
    
    // Update button values and text
    const buttons = document.querySelectorAll('button[data-ar][data-en], input[type="submit"][data-ar][data-en]');
    buttons.forEach(button => {
        if (lang === 'ar') {
            if (button.tagName === 'INPUT') {
                button.value = button.getAttribute('data-ar');
            } else {
                button.textContent = button.getAttribute('data-ar');
            }
        } else {
            if (button.tagName === 'INPUT') {
                button.value = button.getAttribute('data-en');
            } else {
                button.textContent = button.getAttribute('data-en');
            }
        }
    });
}

// Get current language (useful for other scripts)
function getCurrentLanguage() {
    return currentLanguage;
}

// Set language programmatically (useful for other scripts)
function setLanguage(lang) {
    if (lang === 'ar' || lang === 'en') {
        currentLanguage = lang;
        applyLanguageSettings(lang);
        updateContent(lang);
        saveLanguagePreference(lang);
    }
}

// Handle booking form submission
function handleBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const bookingData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time') || '',
        service: formData.get('service'),
        notes: formData.get('notes') || ''
    };
    
    // Validate required fields
    if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.service) {
        const errorMessage = currentLanguage === 'ar' 
            ? 'يرجى ملء جميع الحقول المطلوبة'
            : 'Please fill in all required fields';
        alert(errorMessage);
        return;
    }
    
    // Create WhatsApp message
    const timeText = bookingData.time ? getTimeText(bookingData.time, currentLanguage) : '';
    const message = currentLanguage === 'ar' 
        ? `🦷 *طلب حجز موعد - عيادة د. جوستينا لطب الأسنان* 🦷\n\n` +
          `👋 السلام عليكم، أود حجز موعد في العيادة:\n\n` +
          `📝 *بيانات المريض:*\n` +
          `▪️ الاسم: ${bookingData.name}\n` +
          `▪️ رقم الهاتف: ${bookingData.phone}\n\n` +
          `📅 *تفاصيل الموعد:*\n` +
          `▪️ التاريخ المفضل: ${bookingData.date}\n` +
          `${timeText ? `▪️ الوقت المفضل: ${timeText}\n` : ''}` +
          `▪️ نوع الخدمة: ${getServiceName(bookingData.service, 'ar')}\n\n` +
          `📋 *ملاحظات إضافية:*\n` +
          `${bookingData.notes || 'لا توجد ملاحظات'}\n\n` +
          `🙏 أتطلع لسماع ردكم وتأكيد الموعد، وشكراً لكم.`
        : `🦷 *Appointment Booking Request - Dr. Joustina Dental Clinic* 🦷\n\n` +
          `👋 Hello, I would like to book an appointment at the clinic:\n\n` +
          `📝 *Patient Information:*\n` +
          `▪️ Name: ${bookingData.name}\n` +
          `▪️ Phone: ${bookingData.phone}\n\n` +
          `📅 *Appointment Details:*\n` +
          `▪️ Preferred Date: ${bookingData.date}\n` +
          `${timeText ? `▪️ Preferred Time: ${timeText}\n` : ''}` +
          `▪️ Service Type: ${getServiceName(bookingData.service, 'en')}\n\n` +
          `📋 *Additional Notes:*\n` +
          `${bookingData.notes || 'No additional notes'}\n\n` +
          `🙏 Looking forward to your response and appointment confirmation. Thank you.`;
    
    const whatsappUrl = `https://wa.me/963930478240?text=${encodeURIComponent(message)}`;
    
    // Show confirmation and redirect
    const confirmMessage = currentLanguage === 'ar' 
        ? 'سيتم توجيهك إلى الواتساب لإرسال طلب الحجز. هل تريد المتابعة؟'
        : 'You will be redirected to WhatsApp to send the booking request. Do you want to continue?';
    
    if (confirm(confirmMessage)) {
        window.open(whatsappUrl, '_blank');
        
        // Reset form after successful submission
        event.target.reset();
        
        // Show success message
        const successMessage = currentLanguage === 'ar'
            ? 'تم إرسال طلب الحجز بنجاح! سنتواصل معك قريباً.'
            : 'Booking request sent successfully! We will contact you soon.';
        
        setTimeout(() => {
            alert(successMessage);
        }, 1000);
    }
}

// Get service name in specified language
function getServiceName(serviceValue, lang) {
    const services = {
        'consultation': { ar: 'استشارات عامة', en: 'General Consultation' },
        'restoration': { ar: 'ترميمات تجميلية', en: 'Cosmetic Restorations' },
        'crowns': { ar: 'جسور وتيجان وفينير', en: 'Bridges, Crowns & Veneers' },
        'implants': { ar: 'زراعة الأسنان', en: 'Dental Implants' },
        'root-canal': { ar: 'معالجة لبية', en: 'Root Canal Treatment' },
        'orthodontics': { ar: 'تقويم الأسنان', en: 'Orthodontics' },
        'extraction': { ar: 'قلع الأسنان', en: 'Tooth Extraction' },
        'pediatric': { ar: 'علاج الأطفال', en: 'Pediatric Dentistry' },
        'cleaning': { ar: 'تنظيف وتقليح', en: 'Cleaning & Scaling' },
        'emergency': { ar: 'حالة طارئة', en: 'Emergency' }
    };
    
    return services[serviceValue] ? services[serviceValue][lang] : serviceValue;
}

// Get time text in specified language
function getTimeText(timeValue, lang) {
    const times = {
        'morning': { ar: 'الفترة الصباحية (9:00 ص - 2:00 ظ)', en: 'Morning Session (9:00 AM - 2:00 PM)' },
        'evening': { ar: 'الفترة المسائية (4:00 ع - 9:30 م)', en: 'Evening Session (4:00 PM - 9:30 PM)' }
    };
    
    return times[timeValue] ? times[timeValue][lang] : timeValue;
}

// Handle newsletter subscription
function handleNewsletter(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    
    if (!email) {
        const errorMessage = currentLanguage === 'ar' 
            ? 'يرجى إدخال بريد إلكتروني صحيح'
            : 'Please enter a valid email address';
        alert(errorMessage);
        return;
    }
    
    // Create WhatsApp message for newsletter subscription
    const message = currentLanguage === 'ar' 
        ? `مرحباً، أود الاشتراك في النشرة الطبية:\n\nالبريد الإلكتروني: ${email}`
        : `Hello, I would like to subscribe to the medical newsletter:\n\nEmail: ${email}`;
    
    const whatsappUrl = `https://wa.me/963930478240?text=${encodeURIComponent(message)}`;
    
    // Show confirmation and redirect
    const confirmMessage = currentLanguage === 'ar' 
        ? 'سيتم توجيهك إلى الواتساب لتأكيد الاشتراك. هل تريد المتابعة؟'
        : 'You will be redirected to WhatsApp to confirm subscription. Do you want to continue?';
    
    if (confirm(confirmMessage)) {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        event.target.reset();
        
        // Show success message
        const successMessage = currentLanguage === 'ar'
            ? 'تم إرسال طلب الاشتراك بنجاح!'
            : 'Subscription request sent successfully!';
        
        setTimeout(() => {
            alert(successMessage);
        }, 1000);
    }
}

// Image modal functions
function openImageModal(galleryImageElement) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (!modal || !modalImage) return;
    
    // Get image source and info
    const img = galleryImageElement.querySelector('img');
    const galleryCard = galleryImageElement.closest('.gallery-card');
    const title = galleryCard ? galleryCard.querySelector('.gallery-content h3') : null;
    const description = galleryCard ? galleryCard.querySelector('.gallery-content p') : null;
    
    if (img && img.src && !img.src.includes('placeholder')) {
        // Set modal content
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        if (modalTitle && title) modalTitle.textContent = title.textContent;
        if (modalDescription && description) modalDescription.textContent = description.textContent;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add keyboard event listener for ESC key
        document.addEventListener('keydown', handleModalKeydown);
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleModalKeydown);
    }
}

function handleModalKeydown(event) {
    if (event.key === 'Escape') {
        closeImageModal();
    }
}

// Image handling functions
function handleImageError(img) {
    // If image fails to load, show a placeholder
    img.style.display = 'none';
    const placeholder = img.parentElement.querySelector('.image-placeholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
    } else {
        // Create placeholder if it doesn't exist
        const newPlaceholder = document.createElement('div');
        newPlaceholder.className = 'image-placeholder';
        newPlaceholder.style.cssText = `
            width: 100%;
            height: 100%;
            background: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6c757d;
            font-size: 1rem;
        `;
        newPlaceholder.textContent = currentLanguage === 'ar' ? 'صورة غير متوفرة' : 'Image not available';
        img.parentElement.appendChild(newPlaceholder);
    }
}

function optimizeImages() {
    // Get all images and optimize them
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add error handling
        img.onerror = function() {
            handleImageError(this);
        };
        
        // Add load success handling
        img.onload = function() {
            this.classList.add('loaded');
            // Ensure proper sizing after load
            if (this.closest('.gallery-image') || this.closest('.doctor-image') || this.closest('.about-image')) {
                this.style.objectFit = 'cover';
                this.style.objectPosition = 'center';
            }
        };
        
        // Add loading attribute for better performance
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        // Ensure images maintain aspect ratio
        if (img.closest('.gallery-image') || img.closest('.doctor-image') || img.closest('.about-image')) {
            img.style.objectFit = 'cover';
            img.style.objectPosition = 'center';
        }
        
        // If image is already loaded (cached), add loaded class
        if (img.complete && img.naturalHeight !== 0) {
            img.classList.add('loaded');
            if (img.closest('.gallery-image') || img.closest('.doctor-image') || img.closest('.about-image')) {
                img.style.objectFit = 'cover';
                img.style.objectPosition = 'center';
            }
        }
    });
}

// Set minimum date for booking forms
function setMinimumDate() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.setAttribute('min', today);
        });
    }
}

// Handle mobile menu clicks
function handleMobileMenuClicks() {
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && mobileToggle) {
            if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
                navMenu.classList.remove('active');
            }
        }
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Smooth scrolling for better user experience
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(44, 90, 160, 0.95), rgba(74, 144, 226, 0.95))';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #2c5aa0, #4a90e2)';
                header.style.backdropFilter = 'none';
            }
        }
    });
}

// Initialize form validations
function initializeFormValidations() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    // Remove existing error styling
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, currentLanguage === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required');
        return false;
    }
    
    // Validate email
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
            return false;
        }
    }
    
    // Validate phone
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, currentLanguage === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Validate date (not in the past)
    if (fieldType === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError(field, currentLanguage === 'ar' ? 'لا يمكن اختيار تاريخ في الماضي' : 'Cannot select a date in the past');
            return false;
        }
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    `;
    
    field.parentElement.appendChild(errorElement);
}

// Setup intersection observer for animations
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.card, .service-card, .gallery-card, .blog-card, .tip-card, .value-card, .feature-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeImageModal();
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal && event.target === modal) {
        closeImageModal();
    }
});

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(44, 90, 160, 0.95), rgba(74, 144, 226, 0.95))';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5aa0, #4a90e2)';
            header.style.backdropFilter = 'none';
        }
    }
}, 10);

// Replace the scroll event listener with the optimized version
window.removeEventListener('scroll', initializeSmoothScrolling);
window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS for error styling and language transitions
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Language transition effects */
    [data-ar][data-en] {
        transition: opacity 0.2s ease;
    }
    
    .lang-toggle {
        position: relative;
        overflow: hidden;
    }
    
    .lang-toggle::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease;
    }
    
    .lang-toggle:active::after {
        width: 100px;
        height: 100px;
    }
`;
document.head.appendChild(errorStyles);

// Language persistence debugging (remove in production)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Dr.J Clinic Language System Initialized');
    console.log('Current Language:', currentLanguage);
    console.log('Saved Language:', localStorage.getItem('drj-clinic-language'));
    
    // Add language change listener for debugging
    document.addEventListener('languageChanged', (e) => {
        console.log('Language changed to:', e.detail.language);
    });
}

// Export functions for global access (if needed by other scripts)
window.DrJClinic = {
    getCurrentLanguage,
    setLanguage,
    toggleLanguage,
    updateContent
};