const SR_BASE_URL = 'http://192.168.20.100:8000/api/variable/SR_Projector';

const SR_VARIABLES = {
    powerState: 'powerState',
    muteState: 'muteState',
    projectorInput: 'projectorInput',
    projectorName: 'projectorName',
    lamp1Hrs: 'lamp1Hrs',
    projectorModel: 'projectorModel'
};

async function fetchSRCompanionData() {
    try {
        const [
            powerState,
            muteState,
            projectorInput,
            projectorName,
            lamp1Hrs,
            projectorModel
        ] = await Promise.all([
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.powerState}/value`).then(r => r.text()),
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.muteState}/value`).then(r => r.text()),
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.projectorInput}/value`).then(r => r.text()),
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.projectorName}/value`).then(r => r.text()),
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.lamp1Hrs}/value`).then(r => r.text()),
            fetch(`${SR_BASE_URL}/${SR_VARIABLES.projectorModel}/value`).then(r => r.text())
        ]);

        document.getElementById('srprojectorInput').textContent = projectorInput || 'N/A';
        document.getElementById('srlamp1Hrs').textContent = lamp1Hrs || '--';
        document.getElementById('srmuteState').textContent = muteState || '--';
        document.getElementById('srprojectorName').textContent = projectorName || '--';
        document.getElementById('srprojectorModel').textContent = projectorModel || '--';

        const powerElement = document.getElementById('srpowerStatus');
        const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';

        powerElement.textContent = isOn ? 'ON' : 'OFF';
        powerElement.className = isOn ? 'status connected' : 'status disconnected';

    } catch (error) {
        console.error('SR Projector error:', error);

        document.getElementById('srprojectorInput').textContent = 'ERR';
        document.getElementById('srlamp1Hrs').textContent = '--';
        document.getElementById('srmuteState').textContent = '--';
        document.getElementById('srprojectorName').textContent = '--';
        document.getElementById('srprojectorModel').textContent = '--';

        const powerElement = document.getElementById('srpowerStatus');
        powerElement.textContent = 'OFF';
        powerElement.className = 'status disconnected';
    }
}

fetchSRCompanionData();
setInterval(fetchSRCompanionData, 5000);
