// Theme configurations
const themes = {
  light: {
    name: 'Light Mode',
    icon: '☀️'
  },
  dark: {
    name: 'Dark Mode',
    icon: '🌙'
  },
  service: {
    name: 'Service Mode',
    icon: '🎯'
  }
};

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
  applyTheme(savedTheme);
  createThemeSwitcher();
}

// Apply theme to page
function applyTheme(themeName) {
  document.body.className = `theme-${themeName}`;
  localStorage.setItem('dashboard-theme', themeName);
  updateThemeButton(themeName);
}

// Create theme switcher UI
function createThemeSwitcher() {
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.innerHTML = `
    <button id="theme-toggle" class="theme-toggle" aria-label="Change theme">
      <span id="theme-icon">☀️</span>
    </button>
    <div id="theme-menu" class="theme-menu hidden">
      ${Object.keys(themes).map(key => `
        <button class="theme-option" data-theme="${key}">
          <span class="theme-option-icon">${themes[key].icon}</span>
          <span class="theme-option-name">${themes[key].name}</span>
        </button>
      `).join('')}
    </div>
  `;
  
  document.body.appendChild(switcher);
  
  // Add event listeners
  const toggleBtn = document.getElementById('theme-toggle');
  const menu = document.getElementById('theme-menu');
  
  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
  
  // Theme option clicks
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      menu.classList.add('hidden');
    });
  });
}

// Update theme button icon
function updateThemeButton(themeName) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = themes[themeName].icon;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}