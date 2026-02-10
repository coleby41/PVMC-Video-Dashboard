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

