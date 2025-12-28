async function checkCampus() {
  const banner = document.getElementById('network-banner');

    // Gets the Public IP address of the user
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();

    // Checks the list of ip addresses to see if the user is on campus
    const campusIPs = ["98.101.68.66", "66.56.234.196"]; // 98.101.68.66 is the main campus IP address. 66.56.234.196 is the Leland address. Not the range, just the public IP.

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
        You have left campus. This dashboard only works on the campus network. <a href="404.html">Click here to get help</a>
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
