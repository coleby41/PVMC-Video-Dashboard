const SL_BASE_URL = 'http://192.168.20.100:8000/api/variable/CS_Projector';

async function fetchSLProjectorData() {
    const variables = [
        { key: 'powerState',      elementId: 'cspowerStatus' },
        { key: 'projectorInput',  elementId: 'csInputStatus' },
        { key: 'lamp1Hrs',        elementId: 'csLampHrs' },
        { key: 'muteState',       elementId: 'csMuteStatus' },
        { key: 'projectorName',   elementId: 'csProjectorName' },
        { key: 'projectorModel',  elementId: 'csProjectorModel' },
    ];

    try {
        // Fetch all variables in parallel
        const results = await Promise.all(
            variables.map(v =>
                fetch(`${CS_BASE_URL}/${v.key}/value`).then(r => r.text())
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
        console.error('SL Projector error:', error);

        variables.forEach(({ elementId }) => {
            const el = document.getElementById(elementId);
            if (el) {
                el.textContent = 'ERROR';
                el.className = 'status disconnected';
            }
        });
    }
}

fetchSLProjectorData();
setInterval(fetchSLProjectorData, 5000);