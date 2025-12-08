// Prevent page jump when clicking theme toggle
document.addEventListener('DOMContentLoaded', function() {
    // Find all palette toggle buttons
    const paletteToggles = document.querySelectorAll('.md-header__button[for^="__palette_"]');
    
    paletteToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            // Prevent the default anchor link behavior that causes page jump
            e.preventDefault();
            
            // Get the input element that the label is for
            const targetId = toggle.getAttribute('for');
            const input = document.getElementById(targetId);
            
            if (input) {
                // Toggle the input manually
                input.checked = true;
                // Trigger change event so Material theme switcher works
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    });
});

