async function loadCompanionData() {
  try {
    const response = await fetch("http://192.168.20.126:8002/variables");
    const data = await response.json();

    // Update the element with your variable
    document.getElementById("lamp1Hrs").innerText =
      data["SL_Projector:lamp1Hrs"] || "No Data";
  } catch (error) {
    console.error("Error fetching Companion data:", error);
    document.getElementById("lamp1Hrs").innerText = "Error";
  }
}

// Update every second
setInterval(loadCompanionData, 1000);
loadCompanionData();