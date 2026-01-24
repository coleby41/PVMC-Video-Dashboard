const CS_BASE_URL = 'http://192.168.20.100:8000/api/variable/CS_Projector';

async function fetchCSProjectorData() {
    try {
        const response = await fetch(`${CS_BASE_URL}/powerState/value`);
        const powerState = await response.text();

        const powerElement = document.getElementById('cspowerStatus');
        
        if (powerElement) {
            const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';
            powerElement.textContent = isOn ? 'POWER = ON' : 'POWER = OFF';
            powerElement.className = isOn ? 'status connected' : 'status disconnected';
        }

    } catch (error) {
        console.error('CS Projector error:', error);
        
        const powerElement = document.getElementById('cspowerStatus');
        if (powerElement) {
            powerElement.textContent = 'ERROR';
            powerElement.className = 'status disconnected';
        }
    }
}

fetchCSProjectorData();
setInterval(fetchCSProjectorData, 5000);