const PROXY_URL = 'http://192.168.20.100:3001/api/companion/variables';

// Variable names
const VARIABLES = {
    powerState: 'SR_Peojector:powerState',
    muteState: 'SR_Peojector:muteState',
    projectorInput: 'SR_Peojector:projectorInput',
    projectorName: 'SR_Peojector:projectorName',
    lamp1Hrs: 'SR_Peojector:lamp1Hrs',
    projectorModel: 'SR_Peojector:projectorModel'
};

async function fetchCompanionData() {
    try {
        const response = await fetch(PROXY_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Extract all variables
        const powerState = data[VARIABLES.powerState];
        const muteState = data[VARIABLES.muteState];
        const projectorInput = data[VARIABLES.projectorInput];
        const projectorName = data[VARIABLES.projectorName];
        const lamp1Hrs = data[VARIABLES.lamp1Hrs];
        const projectorModel = data[VARIABLES.projectorModel];
        
        // Update HTML elements
        document.getElementById('projectorInput').textContent = projectorInput || 'N/A';
        document.getElementById('lamp1Hrs').textContent = lamp1Hrs || '--';
        document.getElementById('muteState').textContent = muteState || '--';
        document.getElementById('projectorName').textContent = projectorName || '--';
        document.getElementById('projectorModel').textContent = projectorModel || '--';
        
        // Update power status with color
        const powerElement = document.getElementById('powerStatus');
        if (powerState) {
            const isOn = powerState.toString().toLowerCase().includes('on') || 
                         powerState === '1' || 
                         powerState === 1;
            powerElement.textContent = isOn ? 'ON' : 'OFF';
            powerElement.className = isOn ? 'status connected' : 'status disconnected';
        } else {
            powerElement.textContent = 'Unknown';
            powerElement.className = 'status disconnected';
        }
        
        // Optional: Log to console for debugging
        console.log('SR Projector data updated successfully');
        
    } catch (error) {
        console.error('Error fetching Companion data:', error);
        
        // Set error states on all elements
        document.getElementById('projectorInput').textContent = 'Error';
        document.getElementById('lamp1Hrs').textContent = 'Error';
        document.getElementById('muteState').textContent = 'Error';
        document.getElementById('projectorName').textContent = 'Error';
        document.getElementById('projectorModel').textContent = 'Error';
        
        const powerElement = document.getElementById('powerStatus');
        powerElement.textContent = 'Error';
        powerElement.className = 'status disconnected';
    }
}

// Fetch on load
fetchCompanionData();

// Auto-refresh every 5 seconds
setInterval(fetchCompanionData, 5000);