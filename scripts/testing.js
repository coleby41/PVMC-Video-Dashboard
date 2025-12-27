/* ==================== CONFIGURATION ==================== */
const CORRECT_PASSWORD = '3788';
const PROXY_URL = 'http://192.168.20.100:3001/api/companion/variables';
const VARIABLE_NAME = 'CS_Projector:projectorInput';

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

/* ==================== COMPANION DATA FETCHING ==================== */
async function fetchCompanionData() {
    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get the projector input variable
        const projectorInput = data[VARIABLE_NAME];
        
        // Update UI
        document.getElementById('projectorInput').textContent = projectorInput || 'Not Available';
        document.getElementById('connectionStatus').textContent = 'Connected';
        document.getElementById('connectionStatus').className = 'status connected';
        
        // Show success banner
        showBanner('Companion Connection Active', 'green');
        
        // Update last update time
        const now = new Date().toLocaleTimeString();
        document.getElementById('lastUpdate').textContent = `Last updated: ${now}`;
        
    } catch (error) {
        console.error('Error fetching Companion data:', error);
        
        // Show error banner
        showBanner('Unable to connect to Companion proxy. Make sure the proxy server is running on your Pi.', 'red');
        
        document.getElementById('connectionStatus').textContent = 'Disconnected';
        document.getElementById('connectionStatus').className = 'status disconnected';
        document.getElementById('projectorInput').textContent = 'Error';
    }
}