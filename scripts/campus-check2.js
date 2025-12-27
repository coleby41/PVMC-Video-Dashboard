async function checkCampus() {
  const banner = document.getElementById('network-banner');
  if (!banner) return;

  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const { ip } = await res.json();

    const campusIPs = ["98.101.68.66", "66.56.234.196"];
    const onCampus = campusIPs.includes(ip);

    banner.classList.remove('hidden', 'red', 'green');
    banner.classList.add('banner2', onCampus ? 'green' : 'red');

    if (onCampus) {
      banner.innerHTML = `
        <span class="icon">✔</span>
        Connected to campus network
      `;
    } else {
      banner.innerHTML = `
        <span class="icon">✖</span>
        You have left campus. This dashboard only works on the campus network. <a href="index.html">Go back to the home page</a>
      `;
    }

  } catch (err) {
    banner.classList.remove('hidden', 'green');
    banner.classList.add('banner2', 'red');
    banner.innerHTML = `
      <span class="icon">⚠</span>
      Unable to determine network status.
    `;
  }
}

document.addEventListener("DOMContentLoaded", checkCampus);
