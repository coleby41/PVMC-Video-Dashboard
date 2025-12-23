async function loadCompanionData() {
  try {
    const response = await fetch("http://192.168.20.126:8002/api/variables/values");
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("All variables:", data); // Debug: see all available variables
    
    const lampHours = data["SL_Projector:lamp1Hrs"];
    
    if (lampHours !== undefined) {
      document.getElementById("lamp1Hrs").innerText = lampHours;
    } else {
      console.warn("Variable 'SL_Projector:lamp1Hrs' not found");
      document.getElementById("lamp1Hrs").innerText = "No Data";
    }
  } catch (error) {
    console.error("Error fetching Companion data:", error);
    document.getElementById("lamp1Hrs").innerText = "Error: " + error.message;
  }
}

// Update every second
setInterval(loadCompanionData, 1000);
loadCompanionData();