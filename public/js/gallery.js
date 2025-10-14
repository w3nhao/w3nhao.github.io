// Gallery Modal Functionality
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGallery);
    } else {
        initializeGallery();
    }
    
    function initializeGallery() {
        // Create modal HTML structure
        createModal();
        
        // Add click listeners to all gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) {
            console.log('No gallery items found');
            return;
        }
        
        galleryItems.forEach(function(item, index) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(item, index, galleryItems);
            });
            
            // Add keyboard support
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(item, index, galleryItems);
                }
            });
        });
        
        console.log('Gallery initialized with', galleryItems.length, 'items');
    }
    
    function createModal() {
        // Check if modal already exists
        if (document.getElementById('gallery-modal')) return;
        
        const modalHTML = `
            <div id="gallery-modal" class="gallery-modal" style="display: none;" aria-hidden="true">
                <div class="gallery-modal-content">
                    <span class="gallery-close" title="Close modal">&times;</span>
                    <img class="gallery-modal-image" src="" alt="">
                    <div class="gallery-modal-caption"></div>
                    <div class="gallery-modal-nav">
                        <button class="gallery-prev" type="button" title="Previous image">&#10094;</button>
                        <button class="gallery-next" type="button" title="Next image">&#10095;</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listeners for modal
        const modal = document.getElementById('gallery-modal');
        const closeBtn = modal.querySelector('.gallery-close');
        const prevBtn = modal.querySelector('.gallery-prev');
        const nextBtn = modal.querySelector('.gallery-next');
        
        // Close modal events
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Navigation events
        prevBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateImage(-1);
        });
        
        nextBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navigateImage(1);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const modal = document.getElementById('gallery-modal');
            if (!modal || modal.style.display === 'none') return;
            
            switch(e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateImage(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateImage(1);
                    break;
            }
        });
    }
    
    let currentImageIndex = 0;
    let galleryImages = [];
    
    function openModal(clickedItem, index, allItems) {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        const modalImage = modal.querySelector('.gallery-modal-image');
        const caption = modal.querySelector('.gallery-modal-caption');
        
        // Store gallery data
        currentImageIndex = index;
        galleryImages = Array.from(allItems);
        
        // Get image data
        const img = clickedItem.querySelector('img');
        const overlay = clickedItem.querySelector('.gallery-overlay p');
        
        if (!img) return;
        
        // Set modal content
        modalImage.src = img.src;
        modalImage.alt = img.alt || '';
        caption.textContent = overlay ? overlay.textContent : img.alt || '';
        
        // Show modal with animation
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
        
        // Force reflow to ensure animation plays
        modal.offsetHeight;
        modal.classList.add('modal-show');
        
        // Focus management
        setTimeout(function() {
            modal.querySelector('.gallery-close').focus();
        }, 100);
        
        console.log('Modal opened for image', index + 1, 'of', galleryImages.length);
    }
    
    function closeModal() {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        // Add fade out class
        modal.classList.remove('modal-show');
        modal.classList.add('modal-hide');
        
        // Wait for animation to complete before hiding
        setTimeout(function() {
            modal.style.display = 'none';
            modal.classList.remove('modal-hide');
            document.body.style.overflow = '';
            modal.setAttribute('aria-hidden', 'true');
        }, 300); // Match animation duration
        
        console.log('Modal closed');
    }
    
    function navigateImage(direction) {
        if (galleryImages.length === 0) return;
        
        currentImageIndex += direction;
        
        // Wrap around
        if (currentImageIndex < 0) {
            currentImageIndex = galleryImages.length - 1;
        } else if (currentImageIndex >= galleryImages.length) {
            currentImageIndex = 0;
        }
        
        // Update modal content
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;
        
        const modalImage = modal.querySelector('.gallery-modal-image');
        const caption = modal.querySelector('.gallery-modal-caption');
        
        const currentItem = galleryImages[currentImageIndex];
        const img = currentItem.querySelector('img');
        const overlay = currentItem.querySelector('.gallery-overlay p');
        
        if (img) {
            modalImage.src = img.src;
            modalImage.alt = img.alt || '';
            caption.textContent = overlay ? overlay.textContent : img.alt || '';
        }
        
        console.log('Navigated to image', currentImageIndex + 1, 'of', galleryImages.length);
    }
})(); 