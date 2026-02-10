const CS_BASE_URL = 'http://192.168.20.100:8000/api/variable/CS_Projector';

const CS_VARIABLES = {
    powerState: 'powerState',
    muteState: 'muteState',
    projectorInput: 'projectorInput',
    projectorName: 'projectorName',
    lamp1Hrs: 'lamp1Hrs',
    projectorModel: 'projectorModel'
};

async function fetchCSCompanionData() {
    try {
        const [
            powerState,
            muteState,
            projectorInput,
            projectorName,
            lamp1Hrs,
            projectorModel
        ] = await Promise.all([
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.powerState}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.muteState}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.projectorInput}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.projectorName}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.lamp1Hrs}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.projectorModel}/value`).then(r => r.text())
        ]);

        document.getElementById('csprojectorInput').textContent = projectorInput || 'N/A';
        document.getElementById('cslamp1Hrs').textContent = lamp1Hrs || '--';
        document.getElementById('csmuteState').textContent = muteState || '--';
        document.getElementById('csprojectorName').textContent = projectorName || '--';
        document.getElementById('csprojectorModel').textContent = projectorModel || '--';

        const powerElement = document.getElementById('cspowerStatus');
        const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';

        powerElement.textContent = isOn ? 'ON' : 'OFF';
        powerElement.className = isOn ? 'status connected' : 'status disconnected';

    } catch (error) {
        console.error('CS Projector error:', error);

        document.getElementById('csprojectorInput').textContent = 'ERR';
        document.getElementById('cslamp1Hrs').textContent = '--';
        document.getElementById('csmuteState').textContent = '--';
        document.getElementById('csprojectorName').textContent = '--';
        document.getElementById('csprojectorModel').textContent = '--';

        const powerElement = document.getElementById('cspowerStatus');
        powerElement.textContent = 'OFF';
        powerElement.className = 'status disconnected';
    }
}

fetchCSCompanionData();
setInterval(fetchCSCompanionData, 5000);
