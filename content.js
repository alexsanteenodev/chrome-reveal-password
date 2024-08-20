const openSrc = chrome.runtime.getURL('icons/open.svg');
const closeSrc = chrome.runtime.getURL('icons/close.svg');

document.addEventListener('focusin', (event) => {
    if (event.target.type === 'password') {
        handlePasswordFieldFocus(event.target);
    }
});

function handlePasswordFieldFocus(passwordField) {
    removeExistingIcon();

    const icon = createRevealIcon();
    positionIcon(icon, passwordField);

    document.body.appendChild(icon);

    icon.addEventListener('click', () => {
        togglePasswordVisibility(passwordField, icon);
    });

    // Optionally, you can re-position the icon when the page layout changes
    observeLayoutChanges(passwordField, icon);
}

function createRevealIcon() {
    const icon = document.createElement('img');
    icon.src = openSrc;
    icon.style.position = 'absolute';
    icon.style.cursor = 'pointer';
    icon.style.width = '20px';
    icon.style.height = '20px';
    icon.style.zIndex = '1000';
    icon.setAttribute('data-reveal-icon', 'true');
    return icon;
}

function positionIcon(icon, passwordField) {
    // Add a delay to ensure the layout is fully rendered
    setTimeout(() => {
        const rect = passwordField.getBoundingClientRect();
        const iconWidth = icon.getBoundingClientRect().width;
        icon.style.top = `${window.scrollY + rect.top + (rect.height / 2) - 10}px`;
        icon.style.left = `${window.scrollX + rect.right - iconWidth - 2}px`;
    }, 100); // Adjust the delay if necessary
}

function togglePasswordVisibility(passwordField, icon) {
    const isRevealed = passwordField.type === 'text';
    passwordField.type = isRevealed ? 'password' : 'text';
    icon.src = isRevealed ? openSrc : closeSrc;
}

function removeExistingIcon() {
    const existingIcon = document.querySelector('img[data-reveal-icon="true"]');
    if (existingIcon) {
        existingIcon.remove();
    }
}

function observeLayoutChanges(passwordField, icon) {
    const observer = new MutationObserver(() => {
        positionIcon(icon, passwordField);
    });

    observer.observe(passwordField, { attributes: true, childList: true, subtree: true });

    // Optionally, you can stop observing after some time or when certain conditions are met
    setTimeout(() => observer.disconnect(), 10000); // Disconnect after 10 seconds (adjust as needed)
}