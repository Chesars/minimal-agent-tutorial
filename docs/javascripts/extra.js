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
    
    // Update giscus theme when Material theme changes
    function updateGiscusTheme() {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        
        // Get current theme from Material's data-md-color-scheme attribute
        const scheme = document.body.getAttribute('data-md-color-scheme');
        const theme = scheme === 'slate' ? 'dark' : 'light';
        
        // Send theme update message to giscus iframe
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme: theme } } },
            'https://giscus.app'
        );
    }
    
    // Watch for theme changes using MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-md-color-scheme') {
                updateGiscusTheme();
            }
        });
    });
    
    // Start observing the body element for attribute changes
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
    });
    
    // Set initial theme when giscus loads
    window.addEventListener('message', function(event) {
        if (event.origin !== 'https://giscus.app') return;
        if (!(typeof event.data === 'object' && event.data.giscus)) return;
        
        // Once giscus is ready, update its theme
        updateGiscusTheme();
    });
});

