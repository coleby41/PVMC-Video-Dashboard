const CS_BASE_URL = 'http://192.168.20.100:8000/api/variable/CS_Projector';

const CS_VARIABLES = {
    errorCover: 'errorCover',
    errorFan: 'errorFan',
    errorFilter: 'errorFilter',
    errorLamp: 'errorLamp',
    errorTemp: 'errorTemp'
};

async function fetchErrorData() {
    try {
        const [errorCover, errorFan, errorFilter, errorLamp, errorTemp] = await Promise.all([
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.errorCover}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.errorFan}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.errorFilter}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.errorLamp}/value`).then(r => r.text()),
            fetch(`${CS_BASE_URL}/${CS_VARIABLES.errorTemp}/value`).then(r => r.text())
        ]);

        updateErrorDisplay('errorCover', errorCover, 'Projector cover');
        updateErrorDisplay('errorFan', errorFan, 'Cooling fan');
        updateErrorDisplay('errorFilter', errorFilter, 'Air filter');
        updateErrorDisplay('errorLamp', errorLamp, 'Lamp');
        updateErrorDisplay('errorTemp', errorTemp, 'Temperature');

        // Update last updated timestamp
        document.getElementById('lastUpdate').textContent = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

    } catch (error) {
        console.error(' Projector error:', error);
        
        ['errorCover', 'errorFan', 'errorFilter', 'errorLamp', 'errorTemp'].forEach(errorType => {
            document.getElementById(`${errorType}Dot`).className = 'status-dot unknown';
            document.getElementById(`${errorType}Status`).textContent = 'Connection Error';
            document.getElementById(`${errorType}Status`).className = 'status-text unknown';
            document.getElementById(`${errorType}Details`).textContent = 'Unable to retrieve data';
        });
    }
}

function updateErrorDisplay(errorType, value, componentName) {
    const dot = document.getElementById(`${errorType}Dot`);
    const status = document.getElementById(`${errorType}Status`);
    const details = document.getElementById(`${errorType}Details`);
    
    // Check if error is present (assuming '1' or 'true' means error, '0' or 'false' means no error)
    const hasError = value === '1' || value?.toLowerCase() === 'true' || value?.toLowerCase() === 'error';
    
    if (hasError) {
        dot.className = 'status-dot error';
        status.textContent = 'ERROR';
        status.className = 'status-text error';
        details.textContent = `${componentName} has detected an error condition.`;
    } else {
        dot.className = 'status-dot ok';
        status.textContent = 'OK';
        status.className = 'status-text ok';
        details.textContent = `${componentName} is operating normally.`;
    }
}

// Initial fetch and auto-refresh every 5 seconds
fetchErrorData();
setInterval(fetchErrorData, 300000);