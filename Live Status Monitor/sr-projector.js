const SR_BASE_URL = 'http://192.168.20.100:8000/api/variable/SR_Projector';

async function fetchSRProjectorData() {
    const variables = [
        { key: 'powerState',      elementId: 'srpowerStatus' },
        { key: 'projectorInput',  elementId: 'srInputStatus' },
        { key: 'lamp1Hrs',        elementId: 'srLampHrs' },
        { key: 'muteState',       elementId: 'srMuteStatus' },
        { key: 'projectorName',   elementId: 'srProjectorName' },
        { key: 'projectorModel',  elementId: 'srProjectorModel' },
    ];

    try {
        // Fetch all variables in parallel
        const results = await Promise.all(
            variables.map(v =>
                fetch(`${SR_BASE_URL}/${v.key}/value`).then(r => r.text())
            )
        );

        results.forEach((value, i) => {
            const { key, elementId } = variables[i];
            const el = document.getElementById(elementId);
            if (!el) return;

            if (key === 'powerState') {
                const isOn = value?.toLowerCase().includes('on') || value === '1';
                el.textContent = isOn ? 'POWER = ON' : 'POWER = OFF';
                el.className = isOn ? 'status connected' : 'status disconnected';

            } else if (key === 'muteState') {
                const isMuted = value?.toLowerCase().includes('on') || value === '1';
                el.textContent = isMuted ? 'MUTE = ON' : 'MUTE = OFF';
                el.className = isMuted ? 'status disconnected' : 'status connected';

            } else if (key === 'lamp1Hrs') {
                el.textContent = `${value ?? 'N/A'}`;

            } else if (key === 'projectorInput') {
                el.textContent = `${value ?? 'N/A'}`;

            } else if (key === 'projectorName') {
                el.textContent = `${value ?? 'N/A'}`;

            } else if (key === 'projectorModel') {
                el.textContent = `${value ?? 'N/A'}`;
            }
        });

    } catch (error) {
        console.error('SR Projector error:', error);

        variables.forEach(({ elementId }) => {
            const el = document.getElementById(elementId);
            if (el) {
                el.textContent = 'ERROR';
                el.className = 'status disconnected';
            }
        });
    }
}

fetchSRProjectorData();
setInterval(fetchSRProjectorData, 5000);