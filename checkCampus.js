let scrollPosition = 0; // to store scroll when popup opens

function showPopup(
  type,
  title,
  message,
  buttonText = 'OK',
  buttonAction = null, // NEW: action for primary button
  secondaryButton = null
) {
  const overlay = document.getElementById('popup-overlay');
  const icon = document.getElementById('popup-icon');
  const titleEl = document.getElementById('popup-title');
  const messageEl = document.getElementById('popup-message');
  const buttonsContainer = document.getElementById('popup-buttons-container');

  if (!overlay || !buttonsContainer) return;

  // Save current scroll position
  scrollPosition = window.scrollY || window.pageYOffset;

  // Lock scrolling
  document.body.classList.add('popup-active'); // Add class for CSS
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.width = '100%';

  // Clear buttons
  buttonsContainer.innerHTML = '';

  // Icon + styles
  let buttonClass = 'popup-button';
  if (type === 'success') {
    icon.textContent = '✔';
    icon.className = 'popup-icon success';
  } else if (type === 'error') {
    icon.textContent = '✖';
    icon.className = 'popup-icon error';
    buttonClass = 'popup-button danger';
  } else if (type === 'warning') {
    icon.textContent = '⚠';
    icon.className = 'popup-icon warning';
  }

  titleEl.textContent = title;
  messageEl.innerHTML = message;

  // PRIMARY BUTTON
  const primaryButton = document.createElement('button');
  primaryButton.type = 'button';
  primaryButton.textContent = buttonText;
  primaryButton.className = buttonClass;
  
  // If there's a custom action, use it; otherwise just close
  if (buttonAction && typeof buttonAction === 'function') {
    primaryButton.addEventListener('click', buttonAction);
  } else {
    primaryButton.addEventListener('click', closePopup);
  }
  
  buttonsContainer.appendChild(primaryButton);

  // SECONDARY BUTTON (optional)
  if (secondaryButton?.text && secondaryButton?.action) {
    const secButton = document.createElement('button');
    secButton.type = 'button';
    secButton.textContent = secondaryButton.text;
    secButton.className = 'popup-button secondary';
    secButton.addEventListener('click', secondaryButton.action);
    buttonsContainer.appendChild(secButton);
  }

  overlay.classList.remove('hidden');
}

function closePopup() {
  const overlay = document.getElementById('popup-overlay');
  if (!overlay) return;

  overlay.classList.add('hidden');

  // Restore scrolling
  document.body.classList.remove('popup-active'); // Remove class
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition); // restore scroll to previous position
}

async function checkCampus() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();

    const campusIPs = ["98.101.68.66", "66.56.234.196","173.93.78.209"];
    const onCampus = campusIPs.includes(ip);

    if (onCampus) {
      showPopup(
        'success',
        'Connected to Campus Network',
        'You are successfully connected to the campus network. All features are available.',
        'Continue',
        null, // No special action, just close
        null  // No secondary button
      );
    } else {
      showPopup(
        'error',
        'Not Connected to Campus Network',
        'You have left campus. This dashboard only works on the campus network.',
        'Get Help',
        () => {
          // Primary button action: redirect to help page
          window.location.href = 'help.html';
        },
        {
          text: 'Reload',
          action: () => {
            closePopup();
            location.reload();
          }
        }
      );
    }
  } catch (err) {
    showPopup(
      'warning',
      'Network Check Failed',
      'Unable to determine network status. Please check your internet connection.',
      'Retry',
      () => {
        closePopup();
        checkCampus();
      },
      null // No secondary button for this one
    );
  }
}

// Run AFTER DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  checkCampus();
});