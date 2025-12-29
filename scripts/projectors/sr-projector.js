const BASE_URL = 'http://192.168.20.100:8000/api/variable/SR_Projector';

// Variable names (note: you had a typo "Peojector" - keeping it as is)
const VARIABLES = {
    powerState: 'powerState',
    muteState: 'muteState',
    projectorInput: 'projectorInput',
    projectorName: 'projectorName',
    lamp1Hrs: 'lamp1Hrs',
    projectorModel: 'projectorModel'
};

async function fetchCompanionData() {
    try {
        // Fetch all variables individually using direct API
        const [powerState, muteState, projectorInput, projectorName, lamp1Hrs, projectorModel] = await Promise.all([
            fetch(`${BASE_URL}/${VARIABLES.powerState}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${VARIABLES.muteState}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${VARIABLES.projectorInput}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${VARIABLES.projectorName}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${VARIABLES.lamp1Hrs}/value`).then(r => r.text()),
            fetch(`${BASE_URL}/${VARIABLES.projectorModel}/value`).then(r => r.text())
        ]);
        
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
                         powerState === '1';
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