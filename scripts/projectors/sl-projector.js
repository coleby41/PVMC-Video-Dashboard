const SL_BASE_URL = 'http://192.168.20.100:8000/api/variable/SL_Projector';

const SL_VARIABLES = {
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
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.powerState}/value`).then(r => r.text()),
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.muteState}/value`).then(r => r.text()),
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.projectorInput}/value`).then(r => r.text()),
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.projectorName}/value`).then(r => r.text()),
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.lamp1Hrs}/value`).then(r => r.text()),
            fetch(`${SL_BASE_URL}/${SL_VARIABLES.projectorModel}/value`).then(r => r.text())
        ]);

        document.getElementById('slprojectorInput').textContent = projectorInput || 'N/A';
        document.getElementById('sllamp1Hrs').textContent = lamp1Hrs || '--';
        document.getElementById('slmuteState').textContent = muteState || '--';
        document.getElementById('slprojectorName').textContent = projectorName || '--';
        document.getElementById('slprojectorModel').textContent = projectorModel || '--';
        const powerElement = document.getElementById('slpowerStatus');
        const isOn = powerState?.toLowerCase().includes('on') || powerState === '1';

        powerElement.textContent = isOn ? 'ON' : 'OFF';
        powerElement.className = isOn ? 'status connected' : 'status disconnected';

    } catch (error) {
        console.error('SL Projector error:', error);

        document.getElementById('slprojectorInput').textContent = 'ERR';
        document.getElementById('sllamp1Hrs').textContent = '--';
        document.getElementById('slmuteState').textContent = '--';
        document.getElementById('slprojectorName').textContent = '--';
        document.getElementById('slprojectorModel').textContent = '--';

        const powerElement = document.getElementById('srpowerStatus');
        powerElement.textContent = 'OFF';
        powerElement.className = 'status disconnected';
    }
}

fetchSRCompanionData();
setInterval(fetchSRCompanionData, 5000);
