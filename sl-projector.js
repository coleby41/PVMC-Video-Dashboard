const SL_BASE_URL = 'http://192.168.20.100:8000/api/variable/SL_Projector';

async function fetchSLProjectorData() {
    try {
        const response = await fetch(`${SL_BASE_URL}/powerState/value`);
        const powerState = await response.text();

        const powerElement = document.getElementById('slpowerStatus');
        
        if (powerElement) {
            const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';
            powerElement.textContent = isOn ? 'POWER = ON' : 'POWER = OFF';
            powerElement.className = isOn ? 'status connected' : 'status disconnected';
        }

    } catch (error) {
        console.error('SL Projector error:', error);
        
        const powerElement = document.getElementById('slpowerStatus');
        if (powerElement) {
            powerElement.textContent = 'ERROR';
            powerElement.className = 'status disconnected';
        }
    }
}

fetchSLProjectorData();
setInterval(fetchSLProjectorData, 5000);