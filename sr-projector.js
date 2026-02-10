const SR_BASE_URL = 'http://192.168.20.100:8000/api/variable/SR_Projector';

async function fetchSRCompanionData() {
    try {
        const response = await fetch(`${SR_BASE_URL}/powerState/value`);
        const powerState = await response.text();

        const powerElement = document.getElementById('srpowerStatus');
        
        if (powerElement) {
            const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';
            powerElement.textContent = isOn ? 'POWER = ON' : 'POWER = OFF';
            powerElement.className = isOn ? 'status connected' : 'status disconnected';
        }

    } catch (error) {
        console.error('SR Projector error:', error);
        
        const powerElement = document.getElementById('srpowerStatus');
        if (powerElement) {
            powerElement.textContent = 'ERROR';
            powerElement.className = 'status disconnected';
        }
    }
}

fetchSRCompanionData();
setInterval(fetchSRCompanionData, 5000);