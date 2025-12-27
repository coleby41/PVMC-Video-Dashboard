/* ==================== INITIALIZATION ==================== */
// Check if already authenticated
if (sessionStorage.getItem('authenticated') === 'true') {
    showDashboard();
}

// Allow Enter key to submit password
document.getElementById('passwordInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

/* ==================== PASSWORD FUNCTIONS ==================== */
function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    const errorDiv = document.getElementById('passwordError');
    
    if (input === CORRECT_PASSWORD) {
        sessionStorage.setItem('authenticated', 'true');
        showDashboard();
    } else {
        errorDiv.style.display = 'block';
        document.getElementById('passwordInput').value = '';
        document.getElementById('passwordInput').focus();
    }
}

function showDashboard() {
    document.getElementById('passwordScreen').style.display = 'none';
    document.getElementById('mainDashboard').style.display = 'block';
    fetchCompanionData();
    setInterval(fetchCompanionData, 5000);
}

/* ==================== BANNER FUNCTIONS ==================== */
function showBanner(message, type) {
    const banner = document.getElementById('statusBanner');
    const bannerText = document.getElementById('bannerText');
    
    banner.className = 'banner ' + type;
    bannerText.textContent = message;
    
    setTimeout(() => {
        banner.classList.remove('hidden');
    }, 100);
}

function hideBanner() {
    const banner = document.getElementById('statusBanner');
    // Don't actually hide it, just update to green/connected state
    banner.className = 'banner green';
    document.getElementById('bannerText').textContent = 'Companion Connection Active';
}

