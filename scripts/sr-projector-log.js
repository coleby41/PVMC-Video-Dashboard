const PROXY_URL = 'http://192.168.20.100:3001/api/companion/variables';

// Variable names for error states
const ERROR_VARIABLES = {
    errorCover: 'SR_Projector:errorCover',
    errorFan: 'SR_Projector:errorFan',
    errorFilter: 'SR_Projector:errorFilter',
    errorLamp: 'SR_Projector:errorLamp',
    errorTemp: 'SR_Projector:errorTemp'
};

// Update current time on page load
function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeString;
}

async function fetchErrorData() {
    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract all error variables
        const errorCover = data[ERROR_VARIABLES.errorCover];
        const errorFan = data[ERROR_VARIABLES.errorFan];
        const errorFilter = data[ERROR_VARIABLES.errorFilter];
        const errorLamp = data[ERROR_VARIABLES.errorLamp];
        const errorTemp = data[ERROR_VARIABLES.errorTemp];
        
        // Update HTML elements
        updateErrorRow('errorCover', errorCover, 'Projector cover is properly closed and secured.');
        updateErrorRow('errorFan', errorFan, 'Cooling fans operating within normal parameters.');
        updateErrorRow('errorFilter', errorFilter, 'Air filter is clean and functioning properly.');
        updateErrorRow('errorLamp', errorLamp, 'Lamp is operational with no detected issues.');
        updateErrorRow('errorTemp', errorTemp, 'Temperature is within acceptable operating range.');
        
        // Update last update time
        const now = new Date().toLocaleTimeString();
        document.getElementById('lastUpdate').textContent = now;
        
        
        console.log('SR Projector error log updated successfully');
        
    } catch (error) {
        console.error('Error fetching Companion data:', error);
        
        // Set connection error states
        updateErrorRow('errorCover', null, 'Unable to retrieve status - check proxy connection.');
        updateErrorRow('errorFan', null, 'Unable to retrieve status - check proxy connection.');
        updateErrorRow('errorFilter', null, 'Unable to retrieve status - check proxy connection.');
        updateErrorRow('errorLamp', null, 'Unable to retrieve status - check proxy connection.');
        updateErrorRow('errorTemp', null, 'Unable to retrieve status - check proxy connection.');
    }
}

// Helper function to update error row with dot, status, and details
function updateErrorRow(errorType, value, okMessage) {
    const dotElement = document.getElementById(`${errorType}Dot`);
    const statusElement = document.getElementById(`${errorType}Status`);
    const detailsElement = document.getElementById(`${errorType}Details`);
    
    if (!dotElement || !statusElement || !detailsElement) return;
    
    if (value === null || value === undefined) {
        // Connection error
        dotElement.className = 'status-dot unknown';
        statusElement.className = 'status-text unknown';
        statusElement.textContent = 'Connection Error';
        detailsElement.textContent = 'Unable to retrieve status - check proxy connection.';
        return;
    }
    
    // Convert value to string and check for error conditions
    const valueStr = value.toString().toLowerCase();
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

// Initialize on page load
updateCurrentTime();
fetchErrorData();

// Update current time every second
setInterval(updateCurrentTime, 1000);

// Auto-refresh error data every 5 seconds
setInterval(fetchErrorData, 5000);