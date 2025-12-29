const BASE_URL = 'http://192.168.20.127:8000/api/variable/SR_Projector';

// Variable names for error states
const ERROR_VARIABLES = {
    errorCover: 'errorCover',
    errorFan: 'errorFan',
    errorFilter: 'errorFilter',
    errorLamp: 'errorLamp',
    errorTemp: 'errorTemp'
};

async function fetchErrorData() {
    try {
        // Fetch all error variables individually using direct API
        const [errorCover, errorFan, errorFilter, errorLamp, errorTemp] = await Promise.all([
            fetch(`${BASE_URL}/${ERROR_VARIABLES.errorCover}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${ERROR_VARIABLES.errorFan}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${ERROR_VARIABLES.errorFilter}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${ERROR_VARIABLES.errorLamp}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${ERROR_VARIABLES.errorTemp}/value`).then(r => r.text())
        ]);
        
        // Update HTML elements with status rows
        updateErrorRow('errorCover', errorCover, 'Projector cover is properly closed and secured.');
        updateErrorRow('errorFan', errorFan, 'Cooling fans operating within normal parameters.');
        updateErrorRow('errorFilter', errorFilter, 'Air filter is clean and functioning properly.');
        updateErrorRow('errorLamp', errorLamp, 'Lamp is operational with no detected issues.');
        updateErrorRow('errorTemp', errorTemp, 'Temperature is within acceptable operating range.');
        
        // Update last update time
        const now = new Date().toLocaleTimeString();
        const lastUpdateElement = document.getElementById('lastUpdate');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = now;
        }
        
        // Hide banner on success (if showBanner exists from campus-check2.js)
        if (typeof hideBanner === 'function') {
            hideBanner();
        }
        
        // Optional: Log to console for debugging
        console.log('SR Projector error log updated successfully');
        
    } catch (error) {
        console.error('Error fetching Companion data:', error);
        
        // Show error banner (if showBanner exists from campus-check2.js)
        if (typeof showBanner === 'function') {
            showBanner('Unable to connect to SR Projector. Check network connection.', 'red');
        }
        
        // Set connection error states
        updateErrorRow('errorCover', null, 'Unable to retrieve status - check connection.');
        updateErrorRow('errorFan', null, 'Unable to retrieve status - check connection.');
        updateErrorRow('errorFilter', null, 'Unable to retrieve status - check connection.');
        updateErrorRow('errorLamp', null, 'Unable to retrieve status - check connection.');
        updateErrorRow('errorTemp', null, 'Unable to retrieve status - check connection.');
    }
}

// Helper function to update error row with dot, status, and details
function updateErrorRow(errorType, value, okMessage) {
    const dotElement = document.getElementById(`${errorType}Dot`);
    const statusElement = document.getElementById(`${errorType}Status`);
    const detailsElement = document.getElementById(`${errorType}Details`);
    
    if (!dotElement || !statusElement || !detailsElement) return;
    
    if (value === null || value === undefined || value === '') {
        // Connection error
        dotElement.className = 'status-dot unknown';
        statusElement.className = 'status-text unknown';
        statusElement.textContent = 'Connection Error';
        detailsElement.textContent = 'Unable to retrieve status - check connection.';
        return;
    }
    
    // Convert value to string and check for error conditions
    const valueStr = value.toString().toLowerCase().trim();
    const hasError = valueStr.includes('error') || 
                     valueStr.includes('fail') || 
                     valueStr.includes('warning') ||
                     valueStr === '1' ||
                     valueStr === 'true' ||
                     valueStr === 'yes';
    
    if (hasError) {
        // Error detected
        dotElement.className = 'status-dot error';
        statusElement.className = 'status-text error';
        statusElement.textContent = 'ERROR';
        detailsElement.textContent = `⚠️ Error detected: ${value}`;
    } else {
        // No error
        dotElement.className = 'status-dot ok';
        statusElement.className = 'status-text ok';
        statusElement.textContent = 'OK';
        detailsElement.textContent = `✓ ${okMessage}`;
    }
}

// Fetch on page load
fetchErrorData();

// Auto-refresh error data every 5 seconds
setInterval(fetchErrorData, 5000);