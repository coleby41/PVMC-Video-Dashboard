async function checkCampus() {
  const banner = document.getElementById('network-banner');

  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();

    // CHANGE to your real campus IP(s)
    const campusIPs = ["98.101.68.66"];

    const onCampus = campusIPs.includes(ip);

    banner.classList.remove('hidden');

    if (onCampus) {
      banner.className = 'banner green';
      banner.innerHTML = `
        <span class="icon">✔</span>
        Connected to campus network
      `;
    } else {
      banner.className = 'banner red';
      banner.innerHTML = `
        <span class="icon">✖</span>
        You have left campus. This dashboard only works on the campus network.
      `;
    }

  } catch (err) {
    banner.classList.remove('hidden');
    banner.className = 'banner red';
    banner.innerHTML = `
      <span class="icon">⚠</span>
      Unable to determine network status.
    `;
  }
}

checkCampus();
