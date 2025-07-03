// Gallery specific JavaScript functionality

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleryFilter();
    initializeGalleryModal();
    
    // Listen for language changes to update gallery content
    document.addEventListener('languageChanged', function(e) {
        updateGalleryLanguage(e.detail.language);
    });
});

// Update gallery content when language changes
function updateGalleryLanguage(lang) {
    // Update filter button text
    const filterButtons = document.querySelectorAll('.filter-btn[data-ar][data-en]');
    filterButtons.forEach(button => {
        if (lang === 'ar') {
            button.textContent = button.getAttribute('data-ar');
        } else {
            button.textContent = button.getAttribute('data-en');
        }
    });
    
    // Update modal content if it's open
    const modal = document.getElementById('imageModal');
    if (modal && modal.classList.contains('active')) {
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        // Find the current gallery card to get updated text
        const currentImage = document.getElementById('modalImage');
        if (currentImage && currentImage.src) {
            const galleryCards = document.querySelectorAll('.gallery-card');
            const currentCard = Array.from(galleryCards).find(card => {
                const img = card.querySelector('img');
                return img && img.src === currentImage.src;
            });
            
            if (currentCard) {
                const title = currentCard.querySelector('.gallery-content h3');
                const description = currentCard.querySelector('.gallery-content p');
                
                if (modalTitle && title) modalTitle.textContent = title.textContent;
                if (modalDescription && description) modalDescription.textContent = description.textContent;
            }
        }
    }
}

// Initialize gallery filter functionality
function initializeGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    if (filterButtons.length === 0 || galleryCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            filterGalleryItems(filter, galleryCards);
        });
    });
}

// Filter gallery items based on category
function filterGalleryItems(filter, galleryCards) {
    galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Show card with animation
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        } else {
            // Hide card with animation
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Re-layout gallery grid after filtering
    setTimeout(() => {
        relayoutGallery();
    }, 350);
}

// Re-layout gallery grid
function relayoutGallery() {
    const galleryContainer = document.querySelector('.gallery-treatments');
    if (galleryContainer) {
        // Force reflow
        galleryContainer.style.display = 'none';
        galleryContainer.offsetHeight; // Trigger reflow
        galleryContainer.style.display = 'grid';
    }
}

// Initialize gallery modal functionality
function initializeGalleryModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    // Close modal on background click
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal on touch (mobile)
    modal.addEventListener('touchstart', function(event) {
        if (event.target === modal) {
            closeImageModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (!modal.classList.contains('active')) return;
        
        switch(event.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                navigateGallery('prev');
                break;
            case 'ArrowRight':
                navigateGallery('next');
                break;
        }
    });
    
    // Add swipe support for mobile
    addSwipeSupport(modal);
}

// Navigate through gallery images
function navigateGallery(direction) {
    const currentImage = document.getElementById('modalImage');
    if (!currentImage || !currentImage.src) return;
    
    const visibleCards = Array.from(document.querySelectorAll('.gallery-card'))
        .filter(card => card.style.display !== 'none');
    
    const currentIndex = visibleCards.findIndex(card => {
        const img = card.querySelector('img');
        return img && img.src === currentImage.src;
    });
    
    if (currentIndex === -1) return;
    
    let nextIndex;
    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % visibleCards.length;
    } else {
        nextIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    }
    
    const nextCard = visibleCards[nextIndex];
    const nextImageElement = nextCard.querySelector('.gallery-image');
    
    if (nextImageElement) {
        openImageModal(nextImageElement);
    }
}

// Add swipe support for mobile devices
function addSwipeSupport(modal) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    modal.addEventListener('touchstart', function(event) {
        if (event.target === modal) return; // Only handle swipes on modal background
        
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    });
    
    modal.addEventListener('touchend', function(event) {
        if (event.target === modal) return;
        
        endX = event.changedTouches[0].clientX;
        endY = event.changedTouches[0].clientY;
        
        handleSwipe();
    });
    
    function handleSwipe() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Check if it's a horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - previous image
                navigateGallery('prev');
            } else {
                // Swipe left - next image
                navigateGallery('next');
            }
        }
    }
}

// Enhanced image modal with navigation
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
        // Clear any previous content first
        modalImage.src = '';
        modalImage.alt = '';
        if (modalTitle) modalTitle.textContent = '';
        if (modalDescription) modalDescription.textContent = '';
        
        // Add loading state
        modalImage.style.opacity = '0.5';
        
        // Create a new image to ensure proper loading
        const newImg = new Image();
        newImg.onload = function() {
            // Set modal content after image loads
            modalImage.src = this.src;
            modalImage.alt = img.alt || '';
            modalImage.style.opacity = '1';
            
            if (modalTitle && title) modalTitle.textContent = title.textContent;
            if (modalDescription && description) modalDescription.textContent = description.textContent;
        };
        
        newImg.onerror = function() {
            // Handle error case
            modalImage.style.opacity = '1';
            if (modalTitle) modalTitle.textContent = 'خطأ في تحميل الصورة | Error loading image';
            if (modalDescription) modalDescription.textContent = '';
        };
        
        // Start loading the image
        newImg.src = img.src;
        
        // Add navigation arrows if not already present
        addNavigationArrows(modal);
        
        // Show modal with animation
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Preload adjacent images for smoother navigation
        preloadAdjacentImages(galleryImageElement);
        
        // Add keyboard event listener
        document.addEventListener('keydown', handleModalKeydown);
    }
}

// Add navigation arrows to modal
function addNavigationArrows(modal) {
    // Check if arrows already exist
    if (modal.querySelector('.modal-nav-prev')) return;
    
    const modalContent = modal.querySelector('.modal-content');
    if (!modalContent) return;
    
    // Create previous arrow
    const prevArrow = document.createElement('button');
    prevArrow.className = 'modal-nav-prev';
    prevArrow.innerHTML = '‹';
    prevArrow.setAttribute('aria-label', 'Previous image');
    prevArrow.onclick = () => navigateGallery('prev');
    
    // Create next arrow
    const nextArrow = document.createElement('button');
    nextArrow.className = 'modal-nav-next';
    nextArrow.innerHTML = '›';
    nextArrow.setAttribute('aria-label', 'Next image');
    nextArrow.onclick = () => navigateGallery('next');
    
    // Add styles
    const arrowStyles = `
        .modal-nav-prev,
        .modal-nav-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            padding: 1rem;
            cursor: pointer;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10001;
        }
        
        .modal-nav-prev {
            left: -70px;
        }
        
        .modal-nav-next {
            right: -70px;
        }
        
        .modal-nav-prev:hover,
        .modal-nav-next:hover {
            background: rgba(0, 0, 0, 0.8);
            transform: translateY(-50%) scale(1.1);
        }
        
        @media (max-width: 768px) {
            .modal-nav-prev,
            .modal-nav-next {
                font-size: 1.5rem;
                width: 40px;
                height: 40px;
                padding: 0.5rem;
            }
            
            .modal-nav-prev {
                left: 10px;
            }
            
            .modal-nav-next {
                right: 10px;
            }
        }
    `;
    
    // Add styles to document if not already added
    if (!document.getElementById('modal-nav-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'modal-nav-styles';
        styleElement.textContent = arrowStyles;
        document.head.appendChild(styleElement);
    }
    
    // Append arrows to modal content
    modalContent.appendChild(prevArrow);
    modalContent.appendChild(nextArrow);
}

// Preload adjacent images for smoother navigation
function preloadAdjacentImages(currentImageElement) {
    const visibleCards = Array.from(document.querySelectorAll('.gallery-card'))
        .filter(card => card.style.display !== 'none');
    
    const currentIndex = visibleCards.findIndex(card => 
        card.querySelector('.gallery-image') === currentImageElement
    );
    
    if (currentIndex === -1) return;
    
    // Preload previous image
    const prevIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    const prevImg = visibleCards[prevIndex]?.querySelector('img');
    if (prevImg && prevImg.src) {
        const preloadPrev = new Image();
        preloadPrev.src = prevImg.src;
    }
    
    // Preload next image
    const nextIndex = (currentIndex + 1) % visibleCards.length;
    const nextImg = visibleCards[nextIndex]?.querySelector('img');
    if (nextImg && nextImg.src) {
        const preloadNext = new Image();
        preloadNext.src = nextImg.src;
    }
}

// Enhanced close modal function
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleModalKeydown);
        
        // Don't clear modal content immediately - let it stay for better UX
        // The content will be replaced when opening a new image
    }
}

// Handle modal keyboard events
function handleModalKeydown(event) {
    const modal = document.getElementById('imageModal');
    if (!modal || !modal.classList.contains('active')) return;
    
    switch(event.key) {
        case 'Escape':
            event.preventDefault();
            closeImageModal();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            navigateGallery('prev');
            break;
        case 'ArrowRight':
            event.preventDefault();
            navigateGallery('next');
            break;
    }
}

// Initialize lazy loading for gallery images
function initializeLazyLoading() {
    const images = document.querySelectorAll('.gallery-image img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    }
}

// Initialize masonry layout for gallery (if needed)
function initializeMasonryLayout() {
    const gallery = document.querySelector('.gallery-treatments');
    if (!gallery) return;
    
    // Simple masonry-like layout using CSS Grid
    const cards = gallery.querySelectorAll('.gallery-card');
    cards.forEach((card, index) => {
        // Add slight delay for staggered animation
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Add filter animation styles
const filterStyles = document.createElement('style');
filterStyles.textContent = `
    .gallery-card {
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 1;
        transform: scale(1);
    }
    
    .gallery-card.filtering {
        opacity: 0;
        transform: scale(0.8);
    }
    
    .filter-btn {
        transition: all 0.3s ease;
    }
    
    .filter-btn:not(.active):hover {
        background: #e9ecef;
        border-color: #dee2e6;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(filterStyles);

// Initialize all gallery functionality
function initializeGallery() {
    initializeGalleryFilter();
    initializeGalleryModal();
    initializeLazyLoading();
    initializeMasonryLayout();
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallery);
} else {
    initializeGallery();
}