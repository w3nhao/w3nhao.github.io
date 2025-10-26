// Flat Gallery - No Modal/Zoom
// Simplified gallery for horizontal scrolling display
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGallery);
    } else {
        initializeGallery();
    }
    
    function initializeGallery() {
        const photoItems = document.querySelectorAll('.photo-item');
        if (photoItems.length === 0) {
            console.log('No photo items found');
            return;
        }
        
        console.log('Vertical gallery initialized with', photoItems.length, 'photos');
    }
})(); 